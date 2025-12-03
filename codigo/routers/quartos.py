from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, create_engine
from models import Quarto
from auth import get_current_user

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

router = APIRouter(prefix="/quartos", tags=["Quartos"])

def get_session():
    with Session(engine) as session:
        yield session


# ============================
# LISTAR TODOS OS QUARTOS
# ============================
@router.get("/")
def listar_quartos(status: str = None, session: Session = Depends(get_session)):
    query = select(Quarto)
    if status:
        query = query.where(Quarto.status == status)
    return session.exec(query).all()


# ============================
# BUSCAR UM QUARTO POR ID
# (necessário para tela de edição)
# ============================
@router.get("/{quarto_id}")
def buscar_quarto(quarto_id: int, session: Session = Depends(get_session)):
    quarto = session.get(Quarto, quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")
    return quarto


# ============================
# CRIAR UM NOVO QUARTO
# ============================
@router.post("/")
def criar_quarto(
    quarto: Quarto,
    session: Session = Depends(get_session),
    user=Depends(get_current_user)
):
    existente = session.exec(
        select(Quarto).where(Quarto.numero == quarto.numero)
    ).first()

    if existente:
        raise HTTPException(status_code=400, detail="Número do quarto já cadastrado")

    session.add(quarto)
    session.commit()
    session.refresh(quarto)
    return quarto


# ============================
# EDITAR UM QUARTO EXISTENTE
# ============================
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
    quarto.capacidade = dados.capacidade
    quarto.tipo = dados.tipo
    quarto.preco_diaria = dados.preco_diaria
    quarto.status = dados.status
    quarto.recursos = dados.recursos

    session.commit()
    session.refresh(quarto)
    return quarto


# ============================
# DELETAR UM QUARTO
# ============================
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
