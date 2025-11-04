from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, create_engine
from models import Reserva, hospede, Quarto
import datetime
from auth import get_current_user  # protege as rotas com JWT

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

router = APIRouter(prefix="/reserva", tags=["Reserva"])

def get_session():
    with Session(engine) as session:
        yield session

@router.get("/reserva")
def listar_reservas_proximas(status: str = None, session: Session = Depends(get_session)):
    hoje = datetime.now()
    limite = hoje + datetime.timedelta(days=5)
    
    query = select(Reserva).where(
        Reserva.data_entrada >= hoje,
        Reserva.data_entrada <= limite
    )

    reservas = session.exec(query).all()
    return reservas


@router.post("/")
def criar_reserva(
    reserva: Reserva,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    # Verifica se o hóspede existe
    hospede = session.get(Hospede, reserva.hospede_id)
    if not hospede:
        raise HTTPException(status_code=404, detail="Hóspede não encontrado")

    # Busca o quarto
    quarto = session.get(Quarto, reserva.quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    # Verifica se o quarto está ocupado
    if quarto.status == "ocupado":
        raise HTTPException(status_code=400, detail="Quarto já está ocupado")

    # Cria a reserva
    reserva.data_entrada = datetime.now() if not reserva.data_entrada else reserva.data_entrada
    session.add(reserva)

    # Atualiza o status do quarto
    quarto.status = "ocupado"
    session.add(quarto)

    session.commit()
    session.refresh(reserva)

    return {"msg": "Reserva criada com sucesso", "reserva": reserva}

@router.post("/{reserva_id}")
def realizar_checkin(
    reserva_id: int,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    # Verifica se a reserva existe
    reserva = session.get(Reserva, reserva_id)
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")

    # Busca o quarto
    quarto = session.get(Quarto, reserva.quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    # Se o quarto já estiver ocupado
    if quarto.status == "ocupado":
        raise HTTPException(status_code=400, detail="Quarto já está ocupado")

    # Cria o check-in
    checkin = CheckIn(reserva_id=reserva.id, data_hora=datetime.now())
    session.add(checkin)

    # Atualiza status do quarto
    quarto.status = "ocupado"
    session.add(quarto)

    # Atualiza status da reserva
    reserva.status = "em andamento"
    session.add(reserva)

    session.commit()
    session.refresh(checkin)

    return {"msg": "Check-in realizado com sucesso!", "checkin": checkin}

@router.post("/{reserva_id}")
def realizar_checkout(
    reserva_id: int,
    valor_total: float,
    forma_pagamento: str,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    # Verifica se a reserva existe
    reserva = session.get(Reserva, reserva_id)
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")

    # Busca o quarto
    quarto = session.get(Quarto, reserva.quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    # Verifica se o quarto já está disponível (ou seja, check-out já feito)
    if quarto.status == "disponível":
        raise HTTPException(status_code=400, detail="Este quarto já foi liberado")

    # Cria o check-out
    checkout = CheckOut(
        reserva_id=reserva.id,
        data_hora=datetime.now(),
        valor_total=valor_total,
        forma_pagamento=forma_pagamento
    )
    session.add(checkout)

    # Atualiza status do quarto e da reserva
    quarto.status = "disponível"
    reserva.status = "finalizada"
    session.add(quarto)
    session.add(reserva)

    # Salva tudo
    session.commit()
    session.refresh(checkout)

    return {"msg": "Check-out realizado com sucesso!", "checkout": checkout}