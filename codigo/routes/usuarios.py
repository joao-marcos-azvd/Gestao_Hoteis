from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from datetime import timedelta
from passlib.context import CryptContext
import jwt
from models import Usuario
from sqlmodel import create_engine

SECRET_KEY = "segredo_secreto"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/usuarios", tags=["Usuários"])

def get_session():
    with Session(engine) as session:
        yield session

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    to_encode.update({"exp": timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
def register(usuario: Usuario, session: Session = Depends(get_session)):
    query = select(Usuario).where(Usuario.email == usuario.email)
    existing = session.exec(query).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    usuario.senha = hash_password(usuario.senha)
    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    return {"message": "Usuário criado com sucesso!", "usuario": usuario}

@router.post("/login")
def login(email: str, senha: str, session: Session = Depends(get_session)):
    query = select(Usuario).where(Usuario.email == email)
    user = session.exec(query).first()
    if not user or not verify_password(senha, user.senha):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "user": {"id": user.id, "nome": user.nome, "email": user.email}}
