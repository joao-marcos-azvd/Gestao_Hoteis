from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, create_engine
from models import Reserva
import datetime
from auth import get_current_user  # protege as rotas com JWT

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

router = APIRouter(prefix="/reserva", tags=["Reserva"])

def get_session():
    with Session(engine) as session:
        yield session

@router.reserva("/reserva")
def listar_reservas_proximas(status: str = None, session: Session = Depends(get_session)):
    hoje = datetime.now()
    limite = hoje + datetime.timedelta(days=5)
    
    query = select(Reserva).where(
        Reserva.data_entrada >= hoje,
        Reserva.data_entrada <= limite
    )

    reservas = session.exec(query).all()
    return reservas