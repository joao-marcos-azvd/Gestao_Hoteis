from sqlmodel import SQLModel, Session, create_engine, select
from typing import Optional, List
from datetime import datetime




# Usuário do sistema
class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    email: str
    senha: str   # será criptografada

# Schemas auxiliares
class UsuarioCreate(SQLModel):
    nome: str
    email: str
    senha: str

class Token(SQLModel):
    access_token: str
    token_type: str

# Hóspede
class Hospede(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    cpf: str
    telefone: str
    email: str
    endereco: str

    reservas: List["Reserva"] = Relationship(back_populates="hospede")

# Quarto
class Quarto(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    numero: int
    tipo: str   # Standard, Executivo, Suíte
    preco_diaria: float
    status: str # disponível, ocupado, manutenção
    recursos: str

    reservas: List["Reserva"] = Relationship(back_populates="quarto")

# Reserva
class Reserva(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hospede_id: int = Field(foreign_key="hospede.id")
    quarto_id: int = Field(foreign_key="quarto.id")
    data_entrada: datetime
    data_saida: datetime
    status: str
    observacoes: Optional[str] = None

    hospede: Hospede = Relationship(back_populates="reservas")
    quarto: Quarto = Relationship(back_populates="reservas")

# Check-in
class CheckIn(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    reserva_id: int = Field(foreign_key="reserva.id")
    data_hora: datetime

# Check-out
class CheckOut(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    reserva_id: int = Field(foreign_key="reserva.id")
    data_hora: datetime
    valor_total: float
    forma_pagamento: str
