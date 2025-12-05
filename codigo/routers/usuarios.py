from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select, create_engine
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt
from models import Usuario, UsuarioCreate

SECRET_KEY = "segredo_secreto"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/usuarios", tags=["Usuários"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/usuarios/login")

def get_session():
    with Session(engine) as session:
        yield session

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# Registro corrigido usando UsuarioCreate
@router.post("/register")
def register(usuario: UsuarioCreate, session: Session = Depends(get_session)):
    existing = session.exec(select(Usuario).where(Usuario.email == usuario.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    novo_usuario = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        senha=hash_password(usuario.senha),
        cnpj=usuario.cnpj
    )

    session.add(novo_usuario)
    session.commit()
    session.refresh(novo_usuario)

    return {"message": "Usuário criado com sucesso!", "usuario": novo_usuario}

# Login permanece igual
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    user = session.exec(select(Usuario).where(Usuario.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.senha):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
