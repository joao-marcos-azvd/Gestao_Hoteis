from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import SQLModel, Session, create_engine, select
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import jwt
from models import Usuario, Hospede, Quarto, Reserva, CheckIn, CheckOut, Token, UsuarioCreate

# Configuração do banco (SQLite local por enquanto)
DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL, echo=True)

SECRET_KEY = "segredo_secreto"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_session():
    with Session(engine) as session:
        yield session

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Inicializa app FastAPI
app = FastAPI(title="Sistema de Gestão Interna de Hotel")

# Criação das tabelas no banco
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Evento de inicialização
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# ----------------------------
# ROTAS USUÁRIOS
# ----------------------------
@app.post("/login", response_model=Token)
def register(user: UsuarioCreate, session: Session = Depends(get_session)):
    query = select(Usuario).where(Usuario.email == user.email)
    db_user = session.exec(query).first
    if db_user:
        raise HTTPException(status_code=400, detail="email já cadastrado")
    
    hashed_pw = get_password_hash(user.senha)
    new_user = Usuario(nome=user.nome, email=user.email, senha=hashed_pw)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"msg": "Usuário criado com sucesso"}

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    query = select(Usuario).where(Usuario.email == form_data.username)
    user = session.exec(query).first()

    if not user or not verify_password(form_data.password, user.senha):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me")
def read_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        return {"email": email}
    except:
        raise HTTPException(status_code=401, detail="Token inválido")

# ----------------------------
# ROTAS HÓSPEDES
# ----------------------------
@app.post("/hospedes/", response_model=Hospede)
def criar_hospede(hospede: Hospede):
    with Session(engine) as session:
        session.add(hospede)
        session.commit()
        session.refresh(hospede)
        return hospede

@app.get("/hospedes/", response_model=List[Hospede])
def listar_hospedes():
    with Session(engine) as session:
        return session.exec(select(Hospede)).all()

@app.get("/hospedes/{id}", response_model=Hospede)
def buscar_hospede(id: int):
    with Session(engine) as session:
        hospede = session.get(Hospede, id)
        if not hospede:
            raise HTTPException(status_code=404, detail="Hóspede não encontrado")
        return hospede

@app.put("/hospedes/{id}", response_model=Hospede)
def atualizar_hospede(id: int, hospede: Hospede):
    with Session(engine) as session:
        db_hospede = session.get(Hospede, id)
        if not db_hospede:
            raise HTTPException(status_code=404, detail="Hóspede não encontrado")
        for key, value in hospede.dict(exclude_unset=True).items():
            setattr(db_hospede, key, value)
        session.add(db_hospede)
        session.commit()
        session.refresh(db_hospede)
        return db_hospede

@app.delete("/hospedes/{id}")
def deletar_hospede(id: int):
    with Session(engine) as session:
        hospede = session.get(Hospede, id)
        if not hospede:
            raise HTTPException(status_code=404, detail="Hóspede não encontrado")
        session.delete(hospede)
        session.commit()
        return {"message": "Hóspede removido com sucesso"}

# ----------------------------
# ROTAS QUARTOS
# ----------------------------
@app.post("/quartos/", response_model=Quarto)
def criar_quarto(quarto: Quarto):
    with Session(engine) as session:
        session.add(quarto)
        session.commit()
        session.refresh(quarto)
        return quarto

@app.get("/quartos/", response_model=List[Quarto])
def listar_quartos():
    with Session(engine) as session:
        return session.exec(select(Quarto)).all()

@app.get("/quartos/{id}", response_model=Quarto)
def buscar_quarto(id: int):
    with Session(engine) as session:
        quarto = session.get(Quarto, id)
        if not quarto:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        return quarto

@app.put("/quartos/{id}", response_model=Quarto)
def atualizar_quarto(id: int, quarto: Quarto):
    with Session(engine) as session:
        db_quarto = session.get(Quarto, id)
        if not db_quarto:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        for key, value in quarto.dict(exclude_unset=True).items():
            setattr(db_quarto, key, value)
        session.add(db_quarto)
        session.commit()
        session.refresh(db_quarto)
        return db_quarto

@app.delete("/quartos/{id}")
def deletar_quarto(id: int):
    with Session(engine) as session:
        quarto = session.get(Quarto, id)
        if not quarto:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        session.delete(quarto)
        session.commit()
        return {"message": "Quarto removido com sucesso"}

# ----------------------------
# ROTAS RESERVAS
# ----------------------------
@app.post("/reservas/", response_model=Reserva)
def criar_reserva(reserva: Reserva):
    with Session(engine) as session:
        session.add(reserva)
        session.commit()
        session.refresh(reserva)
        return reserva

@app.get("/reservas/", response_model=List[Reserva])
def listar_reservas():
    with Session(engine) as session:
        return session.exec(select(Reserva)).all()

@app.get("/reservas/{id}", response_model=Reserva)
def buscar_reserva(id: int):
    with Session(engine) as session:
        reserva = session.get(Reserva, id)
        if not reserva:
            raise HTTPException(status_code=404, detail="Reserva não encontrada")
        return reserva

@app.put("/reservas/{id}", response_model=Reserva)
def atualizar_reserva(id: int, reserva: Reserva):
    with Session(engine) as session:
        db_reserva = session.get(Reserva, id)
        if not db_reserva:
            raise HTTPException(status_code=404, detail="Reserva não encontrada")
        for key, value in reserva.dict(exclude_unset=True).items():
            setattr(db_reserva, key, value)
        session.add(db_reserva)
        session.commit()
        session.refresh(db_reserva)
        return db_reserva

@app.delete("/reservas/{id}")
def deletar_reserva(id: int):
    with Session(engine) as session:
        reserva = session.get(Reserva, id)
        if not reserva:
            raise HTTPException(status_code=404, detail="Reserva não encontrada")
        session.delete(reserva)
        session.commit()
        return {"message": "Reserva removida com sucesso"}

# ----------------------------
# ROTAS CHECK-IN / CHECK-OUT
# ----------------------------
@app.post("/check/in/{reserva_id}", response_model=CheckIn)
def realizar_checkin(reserva_id: int):
    checkin = CheckIn(reserva_id=reserva_id, data_hora=datetime.now())
    with Session(engine) as session:
        session.add(checkin)
        session.commit()
        session.refresh(checkin)
        return checkin

@app.post("/check/out/{reserva_id}", response_model=CheckOut)
def realizar_checkout(reserva_id: int, forma_pagamento: str, valor_total: float):
    checkout = CheckOut(reserva_id=reserva_id, data_hora=datetime.now(), forma_pagamento=forma_pagamento, valor_total=valor_total)
    with Session(engine) as session:
        session.add(checkout)
        session.commit()
        session.refresh(checkout)
        return checkout

# ----------------------------
# ROTA TESTE
# ----------------------------
@app.get("/")
def root():
    return {"message": "Sistema de Gestão Interna de Hotel - Backend Ativo 🚀"}
