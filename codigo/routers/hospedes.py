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

# Listar hóspedes (agora protegido com login)
@router.get("/hospedes")
def listar_hospedes(
    status: str = None,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    query = select(Hospede)
    hospedes = session.exec(query).all()
    return hospedes

# Criar um novo hóspede
@router.post("/")
def criar_hospede(
    hospede: Hospede,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    existente = session.exec(
        select(Hospede).where(Hospede.cpf == hospede.cpf)   # padronizado para CPF
    ).first()
    if existente:
        raise HTTPException(status_code=400, detail="CPF do hóspede já cadastrado.")

    session.add(hospede)
    session.commit()
    session.refresh(hospede)
    return hospede

# Atualizar hóspede
@router.put("/{hospede_id}")
def editar_hospede(
    hospede_id: int,
    dados: Hospede,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    hospede = session.get(Hospede, hospede_id)
    if not hospede:
        raise HTTPException(status_code=404, detail="Hóspede não encontrado")

    hospede.nome = dados.nome
    hospede.cpf = dados.cpf
    hospede.telefone = dados.telefone
    hospede.email = dados.email
    hospede.endereco = dados.endereco

    session.add(hospede)
    session.commit()
    session.refresh(hospede)
    return hospede

# Excluir hóspede
@router.delete("/{hospede_id}")
def deletar_hospede(
    hospede_id: int,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    hospede = session.get(Hospede, hospede_id)
    if not hospede:
        raise HTTPException(status_code=404, detail="Hóspede não encontrado")

    session.delete(hospede)
    session.commit()
    return {"message": "Hóspede removido com sucesso!"}

# Visualizar hóspede
@router.get("/{hospede_id}")
def visualizar_hospede(
    hospede_id: int,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    hospede = session.get(Hospede, hospede_id)
    if not hospede:
        raise HTTPException(status_code=404, detail="Hóspede não encontrado")
    return hospede

# Buscar hóspede pelo nome
@router.get("/buscar/{nome}")
def buscar_hospede_por_nome(
    nome: str,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    statement = select(Hospede).where(Hospede.nome == nome)
    hospede = session.exec(statement).first()
    if not hospede:
        raise HTTPException(status_code=404, detail="Hóspede não encontrado")
    return hospede