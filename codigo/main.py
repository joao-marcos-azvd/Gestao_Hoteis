from fastapi import FastAPI, Depends, HTTPException, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import SQLModel, Session, create_engine, select
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import jwt
from models import Usuario

# Configuração banco
DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL, echo=True)
SECRET_KEY = "segredo_secreto"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# FastAPI
app = FastAPI(title="Sistema de Gestão Interna de Hotel")

# Configurar arquivos estáticos e templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

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

# Criar tabelas
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# ----------------------------
# Rotas HTML
# ----------------------------
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/register", response_class=HTMLResponse)
def register_form(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@app.post("/register", response_class=HTMLResponse)
def register(request: Request, nome: str = Form(...), email: str = Form(...), senha: str = Form(...), session: Session = Depends(get_session)):
    query = select(Usuario).where(Usuario.email == email)
    db_user = session.exec(query).first()
    if db_user:
        return templates.TemplateResponse("register.html", {"request": request, "msg": "⚠️ Email já cadastrado"})

    hashed_pw = get_password_hash(senha)
    new_user = Usuario(nome=nome, email=email, senha=hashed_pw)
    session.add(new_user)
    session.commit()
    return templates.TemplateResponse("login.html", {"request": request, "msg": "✅ Usuário criado com sucesso! Faça login."})

@app.post("/login", response_class=HTMLResponse)
def login(request: Request, email: str = Form(...), senha: str = Form(...), session: Session = Depends(get_session)):
    query = select(Usuario).where(Usuario.email == email)
    user = session.exec(query).first()

    if not user or not verify_password(senha, user.senha):
        return templates.TemplateResponse("login.html", {"request": request, "msg": "❌ Credenciais inválidas"})

    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return templates.TemplateResponse("base.html", {"request": request, "msg": f"🎉 Bem-vindo {user.nome}!", "token": access_token})


'''


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

'''
