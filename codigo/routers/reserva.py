from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, create_engine
from models import Reserva, Hospede, Quarto, CheckIn, CheckOut
from datetime import datetime
from auth import get_current_user  # protege as rotas com JWT

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

router = APIRouter(prefix="/reserva", tags=["Reserva"])

def get_session():
    with Session(engine) as session:
        yield session

@router.get("/")
def listar_reservas_proximas(status: str = None, session: Session = Depends(get_session)):
    hoje = datetime.now()
    limite = hoje + timedelta(days=5)

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
    hospede = session.get(Hospede, reserva.hospede_id)
    if not hospede:
        raise HTTPException(status_code=404, detail="Hóspede não encontrado")

    quarto = session.get(Quarto, reserva.quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    if quarto.status == "ocupado":
        raise HTTPException(status_code=400, detail="Quarto já está ocupado")

    reserva.data_entrada = datetime.now() if not reserva.data_entrada else reserva.data_entrada
    session.add(reserva)

    quarto.status = "ocupado"
    session.add(quarto)

    session.commit()
    session.refresh(reserva)

    return {"msg": "Reserva criada com sucesso", "reserva": reserva}

@router.post("/{reserva_id}/checkin")
def realizar_checkin(
    reserva_id: int,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    reserva = session.get(Reserva, reserva_id)
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")

    quarto = session.get(Quarto, reserva.quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    if quarto.status == "ocupado":
        raise HTTPException(status_code=400, detail="Quarto já está ocupado")

    checkin = CheckIn(reserva_id=reserva.id, data_hora=datetime.now())
    session.add(checkin)

    quarto.status = "ocupado"
    reserva.status = "em andamento"
    session.add(quarto)
    session.add(reserva)

    session.commit()
    session.refresh(checkin)

    return {"msg": "Check-in realizado com sucesso!", "checkin": checkin}

@router.post("/{reserva_id}/checkout")
def realizar_checkout(
    reserva_id: int,
    valor_total: float,
    forma_pagamento: str,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    reserva = session.get(Reserva, reserva_id)
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva não encontrada")

    quarto = session.get(Quarto, reserva.quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    if quarto.status == "disponível":
        raise HTTPException(status_code=400, detail="Este quarto já foi liberado")

    checkout = CheckOut(
        reserva_id=reserva.id,
        data_hora=datetime.now(),
        valor_total=valor_total,
        forma_pagamento=forma_pagamento
    )
    session.add(checkout)

    quarto.status = "disponível"
    reserva.status = "finalizada"
    session.add(quarto)
    session.add(reserva)

    session.commit()
    session.refresh(checkout)

    return {"msg": "Check-out realizado com sucesso!", "checkout": checkout}