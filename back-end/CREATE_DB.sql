create schema if not exists controller_password;
use controller_password;

drop user if exists 'controller_password_lucas';

create user 'controller_password_lucas'@'%' identified with mysql_native_password by 'controller_password';
grant all privileges on controller_password. * to 'controller_password_lucas'@'%';
flush privileges;

create table if not exists controller_password.services(
	id integer primary key auto_increment,
    name varchar(255) ,
    username varchar(255) ,
    password varchar(255) ,
    host varchar(255) ,
    type varchar(255) ,
    modified datetime ,
    favorite integer default 0
);
SELECT * FROM controller_password.services;
drop table controller_password.services;

INSERT INTO controller_password.services (name,username,password,host,type,modified) VALUES('lucas', 'lucas_teste', 'jkycdkf', 'lucas.com.br', 'site', '2022-11-16');

select reserva.idReserva, reserva.justificativa, reserva.dataReserva,
reserva.periodo, sala.numero, professor.nome, turma.apelido, sala.idSala, professor.idProfessor, turma.idTurma 
from controller_password.reserva inner join controller_password.sala inner join controller_password.professor inner join controller_password.turma 
on reserva.idSala = sala.IdSala and reserva.idProfessor = professor.idProfessor and reserva.idTurma = turma.idTurma;
