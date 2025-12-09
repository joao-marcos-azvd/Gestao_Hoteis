from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, create_engine
from models import Reserva, Hospede, Quarto, CheckIn, CheckOut
from datetime import datetime, timedelta
from auth import get_current_user
from sqlmodel import SQLModel

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

router = APIRouter(prefix="/reservas", tags=["Reservas"])

def get_session():
    with Session(engine) as session:
        yield session


# -------------------------
# SCHEMAS (NÃO ALTERA O BANCO)
# -------------------------
class ReservaCreate(SQLModel):
    hospede_id: int
    quarto_id: int
    data_entrada: datetime
    data_saida: datetime
    observacoes: str | None = None


class ReservaUpdate(SQLModel):
    hospede_id: int | None = None
    quarto_id: int | None = None
    data_entrada: datetime | None = None
    data_saida: datetime | None = None
    status: str | None = None
    observacoes: str | None = None


# -------------------------
# LISTAR RESERVAS
# -------------------------
@router.get("/")
def listar_reservas(session: Session = Depends(get_session)):
    reservas = session.exec(select(Reserva)).all()
    return reservas


# -------------------------
# LISTAR PROXIMAS
# -------------------------
@router.get("/proximas")
def listar_reservas_proximas(session: Session = Depends(get_session)):
    hoje = datetime.now()
    limite = hoje + timedelta(days=5)

    query = select(Reserva).where(
        Reserva.data_entrada >= hoje,
        Reserva.data_entrada <= limite
    )

    reservas = session.exec(query).all()
    return reservas


# -------------------------
# BUSCAR POR ID
# -------------------------
@router.get("/{reserva_id}")
def buscar_reserva(reserva_id: int, session: Session = Depends(get_session)):
    reserva = session.get(Reserva, reserva_id)
    if not reserva:
        raise HTTPException(404, "Reserva não encontrada")
    return reserva


# -------------------------
# CRIAR RESERVA
# -------------------------
@router.post("/")
def criar_reserva(
    dados: ReservaCreate,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):

    hospede = session.get(Hospede, dados.hospede_id)
    if not hospede:
        raise HTTPException(404, "Hóspede não encontrado")

    quarto = session.get(Quarto, dados.quarto_id)
    if not quarto:
        raise HTTPException(404, "Quarto não encontrado")

    if quarto.status == "ocupado":
        raise HTTPException(400, "Quarto já está ocupado")

    reserva = Reserva(
        hospede_id=dados.hospede_id,
        quarto_id=dados.quarto_id,
        data_entrada=dados.data_entrada,
        data_saida=dados.data_saida,
        observacoes=dados.observacoes,
        status="pendente"
    )

    # Atualizando quarto
    quarto.status = "ocupado"

    session.add(reserva)
    session.add(quarto)
    session.commit()
    session.refresh(reserva)

    return {"msg": "Reserva criada com sucesso", "reserva": reserva}


# -------------------------
# EDITAR RESERVA
# -------------------------
@router.put("/{reserva_id}")
def editar_reserva(
    reserva_id: int,
    dados: ReservaUpdate,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    reserva = session.get(Reserva, reserva_id)
    if not reserva:
        raise HTTPException(404, "Reserva não encontrada")

    dados_dict = dados.dict(exclude_unset=True)

    for key, value in dados_dict.items():
        setattr(reserva, key, value)

    session.add(reserva)
    session.commit()
    session.refresh(reserva)

    return {"msg": "Reserva editada com sucesso", "reserva": reserva}


# -------------------------
# DELETAR RESERVA
# -------------------------
@router.delete("/{reserva_id}")
def deletar_reserva(
    reserva_id: int,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    reserva = session.get(Reserva, reserva_id)
    if not reserva:
        raise HTTPException(404, "Reserva não encontrada")

    session.delete(reserva)
    session.commit()

    return {"msg": "Reserva deletada com sucesso"}


# -------------------------
# CHECK-IN
# -------------------------
@router.post("/{reserva_id}/checkin")
def realizar_checkin(
    reserva_id: int,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    reserva = session.get(Reserva, reserva_id)
    if not reserva:
        raise HTTPException(404, "Reserva não encontrada")

    quarto = session.get(Quarto, reserva.quarto_id)

    checkin = CheckIn(
        reserva_id=reserva.id,
        data_hora=datetime.now()
    )

    quarto.status = "ocupado"
    reserva.status = "em andamento"

    session.add(checkin)
    session.add(quarto)
    session.add(reserva)

    session.commit()
    session.refresh(checkin)

    return {"msg": "Check-in realizado com sucesso!", "checkin": checkin}


# -------------------------
# CHECK-OUT
# -------------------------
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
        raise HTTPException(404, "Reserva não encontrada")

    quarto = session.get(Quarto, reserva.quarto_id)

    checkout = CheckOut(
        reserva_id=reserva.id,
        data_hora=datetime.now(),
        valor_total=valor_total,
        forma_pagamento=forma_pagamento
    )

    quarto.status = "disponível"
    reserva.status = "finalizada"

    session.add(checkout)
    session.add(quarto)
    session.add(reserva)

    session.commit()
    session.refresh(checkout)

    return {"msg": "Check-out realizado com sucesso!", "checkout": checkout}
