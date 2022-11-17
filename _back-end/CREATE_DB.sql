create schema if not exists controller_password;
use controller_password;

drop user if exists 'controller_password_lucas';

create user 'controller_password_lucas'@'%' identified with mysql_native_password by 'controller_password';
grant all privileges on controller_password. * to 'controller_password_lucas'@'%';
flush privileges;

create table if not exists controller_password.services(
	s_id integer primary key auto_increment,
    s_name varchar(255) ,
    s_username varchar(255) ,
    s_password varchar(255) ,
    s_host varchar(255) ,
    s_type varchar(255) ,
    s_modified varchar(255) ,
    s_favorite integer default 0
);
SELECT * FROM controller_password.services;
drop table controller_password.services;

INSERT INTO controller_password.services (s_name,s_username,s_password,s_host,s_type,s_modified) VALUES('lucas', 'lucas_teste', 'jkycdkf', 'lucas.com.br', 'site', '2022-11-16');
INSERT INTO controller_password.services (s_name,s_username,s_password,s_host,s_type,s_modified) VALUES("asd","sdf","safds","sdfsd","asda","asdasd");

select reserva.idReserva, reserva.justificativa, reserva.dataReserva,
reserva.periodo, sala.numero, professor.nome, turma.apelido, sala.idSala, professor.idProfessor, turma.idTurma 
from controller_password.reserva inner join controller_password.sala inner join controller_password.professor inner join controller_password.turma 
on reserva.idSala = sala.IdSala and reserva.idProfessor = professor.idProfessor and reserva.idTurma = turma.idTurma;
