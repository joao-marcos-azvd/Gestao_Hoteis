from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, create_engine
from models import Hospede
from auth import get_current_user  # protege as rotas com JWT

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

router = APIRouter(prefix="/hospede", tags=["Hospede"])

def get_session():
    with Session(engine) as session:
        yield session

#Listar hospedes
@router.get("/hoespedes")
def listar_hospedes(status: str = None, session: Session = Depends(get_session)):
    query = select(Hospede)
    hospedes = session.exec(query).all()
    return hospedes

#  Criar um novo hospedes
@router.post("/")
def criar_hospede(
    hospede: Hospede,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    existente = session.exec(select(Hospede). where(Hospede.numero == hospede.numero))
    if existente:
        raise HTTPException(status_code=400, detail="CPF do Hóspede já cadastrado.")
    session.add(hospede)
    session.commit()
    session.refresh(hospede)
    return hospede

#  Atualizar hospede
@router.put("/{hospede_id}")
def editar_hospede(
    hospede_id: int,
    dados: Hospede,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    hospede = session.get(Hospede, hospede_id)
    if not hospede:
        raise HTTPException(status_code=404, detail="hospede não encontrado")

    hospede.nome = dados.nome
    hospede.cpf = dados.cpf
    hospede.telefone = dados.telefone
    hospede.email = dados.email
    hospede.endereco = dados.endereco

    session.add(hospede)
    session.commit()
    session.refresh(hospede)
    return hospede

# Excluir hospede
@router.delete("/{hospede_id}")
def deletar_hospede(
    hospede_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)
):
    hospede = session.get(Hospede, hospede_id)
    if not hospede:
        raise HTTPException(status_code=404, detail="hospede não encontrado")

    session.delete(hospede)
    session.commit()
    return {"message": "hospede removido com sucesso!"}

#visualizar hóspedes
@router.get("/{hospede_id}")
def visualizar_hospede(
    hospede_id: int, session: Session = Depends(get_session), user = Depends(get_current_user)
):
    hospede = session.get(Hospede, hospede_id)
    if not hospede:
        raise HTTPException(status_code=404, detail="hospede não encontrado")
    return hospede