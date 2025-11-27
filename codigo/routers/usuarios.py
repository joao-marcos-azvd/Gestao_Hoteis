from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select, create_engine
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt
from models import Usuario

SECRET_KEY = "segredo_secreto"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/usuarios", tags=["Usuários"])

# 🔑 Configuração do esquema de segurança
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/usuarios/login")

def get_session():
    with Session(engine) as session:
        yield session

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# 🔒 Função para validar token
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

# 📌 Registro de usuário
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

# 📌 Login
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    query = select(Usuario).where(Usuario.email == form_data.username)
    user = session.exec(query).first()
    if not user or not verify_password(form_data.password, user.senha):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_access_token({"sub": user.email})
    return {
        "access_token": token,
        "token_type": "bearer"
    }
