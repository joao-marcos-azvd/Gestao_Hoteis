# routers/quartos.py
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlmodel import Session, select, create_engine

from models import Quarto
from auth import get_current_user

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

router = APIRouter(prefix="/quartos", tags=["Quartos"])


def get_session():
    with Session(engine) as session:
        yield session


# Pasta para salvar imagens dos quartos
STATIC_QUARTOS_DIR = Path("static/quartos")
STATIC_QUARTOS_DIR.mkdir(parents=True, exist_ok=True)


# ============================
# LISTAR TODOS OS QUARTOS
# ============================
@router.get("/")
def listar_quartos(status: str | None = None, session: Session = Depends(get_session)):
    query = select(Quarto)
    if status:
        query = query.where(Quarto.status == status)
    return session.exec(query).all()


# ============================
# BUSCAR UM QUARTO POR ID (NOVA ROTA)
# Compatível com: GET /quartos/3
# ============================
@router.get("/{quarto_id}")
def buscar_quarto_por_id(quarto_id: int, session: Session = Depends(get_session)):
    quarto = session.get(Quarto, quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")
    return quarto


# ============================
# BUSCAR UM QUARTO POR NÚMERO
# (mantido, caso você precise)
# ============================
@router.get("/numero/{numero}")
def buscar_quarto_por_numero(numero: int, session: Session = Depends(get_session)):
    statement = select(Quarto).where(Quarto.numero == numero)
    quarto = session.exec(statement).first()
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")
    return quarto



# ============================
# CRIAR UM NOVO QUARTO
# ============================
@router.post("/")
async def criar_quarto(
    numero: int = Form(...),
    capacidade: int = Form(...),
    tipo: str = Form(...),
    preco_diaria: float = Form(...),
    status: str = Form(...),
    recursos: str = Form(""),
    imagem: UploadFile | None = File(None),
    session: Session = Depends(get_session),
    user=Depends(get_current_user),
):
    existente = session.exec(
        select(Quarto).where(Quarto.numero == numero)
    ).first()
    if existente:
        raise HTTPException(
            status_code=400, detail="Número do quarto já cadastrado"
        )

    imagem_url = None
    if imagem:
        file_path = STATIC_QUARTOS_DIR / imagem.filename
        with file_path.open("wb") as f:
            f.write(await imagem.read())
        imagem_url = f"/static/quartos/{imagem.filename}"

    quarto = Quarto(
        numero=numero,
        capacidade=capacidade,
        tipo=tipo,
        preco_diaria=preco_diaria,
        status=status,
        recursos=recursos,
        imagem_url=imagem_url,
    )

    session.add(quarto)
    session.commit()
    session.refresh(quarto)
    return quarto


# ============================
# EDITAR UM QUARTO
# ============================
@router.put("/{quarto_id}")
async def editar_quarto(
    quarto_id: int,
    numero: int = Form(...),
    capacidade: int = Form(...),
    tipo: str = Form(...),
    preco_diaria: float = Form(...),
    status: str = Form(...),
    recursos: str = Form(""),
    imagem: UploadFile | None = File(None),
    session: Session = Depends(get_session),
    user=Depends(get_current_user),
):
    quarto = session.get(Quarto, quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    # atualizar dados
    quarto.numero = numero
    quarto.capacidade = capacidade
    quarto.tipo = tipo
    quarto.preco_diaria = preco_diaria
    quarto.status = status
    quarto.recursos = recursos

    # atualizar imagem (opcional)
    if imagem:
        file_path = STATIC_QUARTOS_DIR / imagem.filename
        with file_path.open("wb") as f:
            f.write(await imagem.read())
        quarto.imagem_url = f"/static/quartos/{imagem.filename}"

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
    user=Depends(get_current_user),
):
    quarto = session.get(Quarto, quarto_id)
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")

    session.delete(quarto)
    session.commit()
    return {"message": "Quarto removido com sucesso!"}
