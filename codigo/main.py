from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, create_engine
from routers import usuarios, hospedes, quartos, reservas

DATABASE_URL = "sqlite:///hotel.db"
engine = create_engine(DATABASE_URL, echo=True)

app = FastAPI(title="API do Sistema de Gestão de Hotel")

# CORS para React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Rotas
app.include_router(usuarios.router)
app.include_router(hospedes.router)
app.include_router(quartos.router)
app.include_router(reservas.router)

@app.get("/")
def home():
    return {"message": "API do sistema de hotel funcionando!"}
