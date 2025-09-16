from fastapi import FastAPI, HTTPException
from sqlmodel import SQLModel, create_engine, Session, select
from typing import List
from datetime import datetime

# Importa os modelos
from models import Usuario, Hospede, Quarto, Reserva, CheckIn, CheckOut

# Configuração do banco (SQLite local por enquanto)
DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL, echo=True)

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
@app.post("/usuarios/", response_model=Usuario)
def criar_usuario(usuario: Usuario):
    with Session(engine) as session:
        session.add(usuario)
        session.commit()
        session.refresh(usuario)
        return usuario

@app.get("/usuarios/{id}", response_model=Usuario)
def buscar_usuario(id: int):
    with Session(engine) as session:
        usuario = session.get(Usuario, id)
        if not usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        return usuario

@app.post("/usuarios/login")
def login(email: str, senha: str):
    with Session(engine) as session:
        query = select(Usuario).where(Usuario.email == email, Usuario.senha == senha)
        usuario = session.exec(query).first()
        if not usuario:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")
        return {"message": f"Bem-vindo {usuario.nome}!"}

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
