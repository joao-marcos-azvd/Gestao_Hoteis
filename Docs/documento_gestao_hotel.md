# Sistema de Gestão Interna de Hotel
## 1. INTRODUÇÃO
Este documento apresenta a proposta para o desenvolvimento de um sistema de gerenciamento de hotel, pensado especialmente para facilitar o dia a dia de quem trabalha com hospedagem. A ideia é criar uma ferramenta simples, intuitiva e eficiente, que automatize as principais tarefas administrativas, como controle de reservas, cadastros de hóspedes e quartos, além do registro de entradas e saídas dos clientes.

## 2. OBJETIVO
Nosso objetivo é desenvolver uma solução prática e acessível para ajudar hotéis de pequeno e médio porte a organizarem melhor suas rotinas. Com o sistema, será possível acompanhar as reservas, monitorar os quartos disponíveis e ocupados e oferecer uma experiência mais profissional e acolhedora para os hóspedes.

## 3. PÚBLICO-ALVO
O sistema foi pensado para ser utilizado principalmente pelos administradores do hotel. Esses profissionais terão acesso completo a todas as funcionalidades e relatórios, podendo gerenciar reservas, hóspedes e quartos. O sistema centraliza a gestão em um único ambiente digital, ideal para hotéis em que o próprio administrador realiza as tarefas de recepção e atendimento.

## 4. VISÃO GERAL DO SISTEMA
A proposta é desenvolver um sistema web, acessível de qualquer lugar, com uma interface amigável. O backend será feito em Python com FastAPI e utilizará SQLModel para o banco de dados. O frontend será desenvolvido em ReactJS, garantindo uma experiência rápida e responsiva.

## 5. FUNCIONALIDADES
### 5.1 Cadastro de Hóspedes
Permite que os administradores registrem todos os dados dos hóspedes: nome completo, CPF, telefone, e-mail, endereço e observações importantes (Desejavel).

### 5.2 Cadastro de Quartos
Os quartos do hotel podem ser cadastrados com todas as informações relevantes: número, tipo (Solteiro, Casal e VIP), preço da diária, status (disponível, ocupado, manutenção) e recursos extras, como Café da manhã, TV, serviço de quarto, etc.

### 5.3 Controle de Reservas/Check-in e Check-out
Facilita a criação e o gerenciamento de reservas, associando hóspedes a quartos, com datas de entrada e saída, status e observações gerais (Desejavel).

Registra as entradas e saídas dos hóspedes, incluindo horário e quarto utilizado. Esses dados ajudam a calcular o valor total da estadia e alimentar os relatórios.

### 5.4 Status de pagamentos
Controla os pagamentos realizados pelos hóspedes, permitindo registrar forma de pagamento, valores e status (Efetuado ou pendente).

### 5.5 Relatórios
**OBS: Usar o arquivo jsonsever**

Gera relatórios completos sobre a ocupação dos quartos, receitas por período, histórico de hóspedes e reservas.

## 6. REQUISITOS DO SISTEMA
### 6.1 Requisitos Funcionais
* O sistema deve permitir o cadastro, edição e exclusão de hóspedes;

* O sistema deve permitir o cadastro, edição e exclusão de quartos;

* O sistema deve possibilitar o gerenciamento de reservas;

* O sistema deve alterar status do quarto (ocupado, livre ou em manutenção);

* O sistema deve registrar entradas (check-in) e saídas (check-out) dos hóspedes;

* O sistema deve gerar relatórios diversos conforme necessidade administrativa. __(Pensar)__

### 6.2 Requisitos Não Funcionais
* O sistema deve ser responsivo, adaptando-se bem a celulares e tablets.

* As senhas devem ser armazenadas com segurança, usando criptografia.

* A interface deve seguir princípios básicos de acessibilidade para web (UI e UX).

## 7. MODELO DE DADOS
O sistema será construído com os seguintes modelos de dados:
* Hóspede: id, nome, cpf, telefone, email, endereço;

* Quarto: id, número, tipo, preço da diária, status, recursos;

* Reserva: id, hóspede_id, quarto_id, data de entrada, data de saída, status, observações;

* Check-in: id, reserva_id, data e hora;

* Check-out: id, reserva_id, data e hora, valor total, forma de pagamento;

* Usuário: id, nome, email e senha (criptografada).

## 8. CONSIDERAÇÕES FINAIS
O sistema de gerenciamento de hotel aqui proposto tem como foco principal simplificar o cotidiano dos profissionais da hotelaria, tornando os processos mais ágeis e organizados. No futuro, o sistema poderá ser expandido com recursos como controle de manutenção de quartos, envio automático de confirmações por e-mail, e integração com portais de reserva. O desenvolvimento será feito de maneira modular, garantindo que ele possa crescer conforme as necessidades do hotel.
Este projeto busca unir tecnologia e hospitalidade, criando uma solução prática, acessível e eficiente para quem cuida de um hotel.
