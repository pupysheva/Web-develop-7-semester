package ru.mirea.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class ItemDB {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    ItemDB(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public void init(){
        // init db инициализация базы данных
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS Needdo(id int NOT NULL PRIMARY KEY AUTO_INCREMENT,name VARCHAR)");
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS Done(id int NOT NULL PRIMARY KEY AUTO_INCREMENT,name VARCHAR)");
        //в базе данных цена в долларах
        //наполняем базу тоже тут
        jdbcTemplate.execute("INSERT INTO Needdo(name) VALUES ('Помыть посуду'), ('Сделать НИР')");
        jdbcTemplate.execute("INSERT INTO Done(name) VALUES ('Сходить в магазин')");


    }
}
