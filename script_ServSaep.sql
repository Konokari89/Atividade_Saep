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
    data				datetime			not null);
    
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

