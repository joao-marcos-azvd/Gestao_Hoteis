from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, create_engine
from models import Quarto
from auth import get_current_user  # protege as rotas com JWT

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

router = APIRouter(prefix="/quartos", tags=["Quartos"])

def get_session():
    with Session(engine) as session:
        yield session

# Listar quartos com filtro
@router.get("/quartos")
def listar_quartos(status: str = None, session: Session = Depends(get_session)):
    query = select(Quarto)
    if status:
        query = query.where(Quarto.status == status)
    quartos = session.exec(query).all()
    return quartos

#  Criar um novo quarto
@router.post("/")
def criar_quarto(
    quarto: Quarto,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    existente = session.exec(select(Quarto). where(Quarto.numero == quarto.numero))
    if existente:
        raise HTTPException(status_code=400, detail="numero do quaro já cadastrado.")
    session.add(quarto)
    session.commit()
    session.refresh(quarto)
    return quarto


#  Atualizar quarto
@router.put("/{quarto_id}")
def editar_quarto(
    quarto_id: int,
    dados: Quarto,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    quarto = session.get(Quarto, quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    quarto.numero = dados.numero
    quarto.tipo = dados.tipo
    quarto.preco_diaria = dados.preco_diaria
    quarto.recursos = dados.recursos

    session.add(quarto)
    session.commit()
    session.refresh(quarto)
    return quarto

# Excluir quarto
@router.delete("/{quarto_id}")
def deletar_quarto(
    quarto_id: int,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    quarto = session.get(Quarto, quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    session.delete(quarto)
    session.commit()
    return {"message": "Quarto removido com sucesso!"}
