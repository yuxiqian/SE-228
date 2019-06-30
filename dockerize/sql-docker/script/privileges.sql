use bookie;
select host, user from user;

create user docker identified by '123456docker';

grant all on bookie.* to docker@'%' identified by '123456docker' with grant option;

flush privileges;