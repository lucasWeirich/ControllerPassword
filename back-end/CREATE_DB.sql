create schema if not exists organized_school;
use organized_school;

drop user if exists 'organizedSchool_teste';

create user 'organized_school_teste'@'%' identified with mysql_native_password by '123456';
grant all privileges on organized_school. * to 'organized_school_teste'@'%';
flush privileges;

create table if not exists organized_school.usuario(
	idUsuario integer primary key auto_increment,
    email varchar(255) unique not null,
    senha varchar(255) not null
);

create table if not exists organized_school.aluno(
	idAluno integer primary key auto_increment,
    nome varchar(255) not null,
    cpf varchar(255) unique not null,
    dataNascimento date not null,
    email varchar(255) unique not null,
    sexo char(1) not null,
    telefone varchar(20) unique not null,
    dataCadastro datetime default now(),
    situacao integer not null default 1
);

create table if not exists organized_school.professor(
	idProfessor integer primary key auto_increment,
    nome varchar(255) not null,
    cpf varchar(255) unique not null,
    dataNascimento date not null,
    email varchar(255) unique not null,
    sexo char(1) not null,
    telefone varchar(20) unique not null,
    dataCadastro datetime default now(),
    situacao integer not null default 1
);

create table if not exists organized_school.sala(
	idSala integer primary key auto_increment,
    numero int not null unique,
    bloco int not null,
    apelido varchar(50) not null,
    tipo varchar(50) not null,
    capacidade int not null,
    dataCadastro datetime default now(),
    situacao integer not null default 1
);

INSERT INTO organized_school.sala (numero,bloco,apelido,capacidade,tipo) VALUES(222,2,'tetteteetererte', 22, '234sdafsdfsdafsda');

create table if not exists organized_school.turma(
	idTurma integer primary key auto_increment,
    apelido varchar(50) not null,
    nomeCurso varchar(100) not null,
    anoInicio date not null,
    duracao int not null,
    dataCadastro datetime default now(),
    situacao integer not null default 1
);

create table if not exists organized_school.reserva(
	idReserva integer primary key auto_increment,
    justificativa varchar(100) not null,
    dataReserva date not null,
    periodo char(1) null,
    idSala int not null,
    idProfessor int not null,
    idTurma int not null,
    dataCadastro datetime default now(),
    situacao integer not null default 1,
    foreign key (idSala) references sala (idSala),
    foreign key (idProfessor) references professor (idProfessor),
    foreign key (idTurma) references turma (idTurma)
);

select reserva.idReserva, reserva.justificativa, reserva.dataReserva,
reserva.periodo, sala.numero, professor.nome, turma.apelido, sala.idSala, professor.idProfessor, turma.idTurma 
from organized_school.reserva inner join organized_school.sala inner join organized_school.professor inner join organized_school.turma 
on reserva.idSala = sala.IdSala and reserva.idProfessor = professor.idProfessor and reserva.idTurma = turma.idTurma;

insert into organized_school.usuario(email, senha)
values ("teste@senai.com.br", "$2a$10$VVMUKEdMNnL09xKw75CTLuzfhB09j1qxFQZpjynq8q.p1d5vdcDTG");


