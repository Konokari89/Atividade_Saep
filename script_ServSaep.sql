create database translog_db;

use translog_db;

create table usuario(
	id_usuario			serial,
    nome				varchar(50)			not null,
    cpf					varchar(11)			not null,
    senha				varchar(512)		not null,
    tipo				varchar(20)			not	null);
    
create table manutencao(
	id_manutencao		serial,
    tipo				varchar(50)			not null,
    custo				decimal(8,2)		not null,
    dia_hora			datetime			not null);
    
create table veiculo(
	placa				varchar(7)			not null,
    modelo				varchar(15)			not	null,
    quilometragem	    decimal(15,2)		not null,
    marca				varchar(20)			not null,
    primary key(placa));
    
create table viagem_realizada(
	dia_hora			datetime			not	null,
    origem				varchar(50)			not null,
    destino	 			varchar(50)			not null,
    placa				varchar(7)			not null	references veiculo,
    id_usuario			bigint				unsigned,
    foreign key(id_usuario) references usuario(id_usuario))ENGINE=InnoDB;
    
create table manutencao_realizada(
	placa				varchar(7)			not null	references veiculo,
	id_manutencao		bigint				unsigned,
	foreign key(id_manutencao) references manutencao(id_manutencao))ENGINE=InnoDB;

    
create table relatorios(
	id_relatorio		serial,
    dia_hora			datetime			not null,
    id_usuario			bigint				unsigned,
	id_manutencao		bigint				unsigned,
    placa				varchar(7)			not null	references veiculo,
    foreign key(id_usuario) references usuario(id_usuario),
    foreign key(id_manutencao) references manutencao(id_manutencao))ENGINE=InnoDB;

insert into usuario(nome, cpf, senha, tipo) values('admin', '00000000000', 'admin123', 'administrador');
insert into usuario(nome, cpf, senha, tipo) values('user', '11111111111', 'user123', 'usuario');
insert into usuario(nome, cpf, senha, tipo) values('mechanic', '22222222222', 'mech123', 'mecanico');

insert into veiculo(placa, modelo, quilometragem, marca) values('ABC1234', 'ModeloX', 15000.50, 'MarcaY');
insert into veiculo(placa, modelo, quilometragem, marca) values('DEF5678', 'ModeloA', 30000.75, 'MarcaB');
insert into veiculo(placa, modelo, quilometragem, marca) values('GHI9012', 'ModeloM', 45000.00, 'MarcaN');

insert into manutencao(tipo, custo, dia_hora) values('Preventiva', 250.00, '2024-07-01 10:00:00');
insert into manutencao(tipo, custo, dia_hora) values('Corretiva', 500.00, '2024-07-05 14:30:00');
insert into manutencao(tipo, custo, dia_hora) values('Preventiva', 300.00, '2024-07-10 09:15:00');

insert into viagem_realizada(dia_hora, origem, destino, placa, id_usuario) values('2024-06-20 08:00:00', 'CidadeA', 'CidadeB', 'ABC1234', 2);
insert into viagem_realizada(dia_hora, origem, destino, placa, id_usuario) values('2024-06-22 09:30:00', 'CidadeC', 'CidadeD', 'DEF5678', 2);
insert into viagem_realizada(dia_hora, origem, destino, placa, id_usuario) values('2024-06-25 07:45:00', 'CidadeE', 'CidadeF', 'GHI9012', 2);

insert into manutencao_realizada(placa, id_manutencao) values('ABC1234', 1);
insert into manutencao_realizada(placa, id_manutencao) values('DEF5678', 2);
insert into manutencao_realizada(placa, id_manutencao) values('GHI9012', 3);

insert into relatorios(dia_hora, id_usuario, id_manutencao, placa) values('2024-06-30 12:00:00', 1, 1, 'ABC1234');
insert into relatorios(dia_hora, id_usuario, id_manutencao, placa) values('2024-06-30 12:30:00', 1, 2, 'DEF5678');
insert into relatorios(dia_hora, id_usuario, id_manutencao, placa) values('2024-06-30 13:00:00', 1, 3, 'GHI9012');

