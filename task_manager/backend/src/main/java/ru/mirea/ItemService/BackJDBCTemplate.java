package ru.mirea.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.util.List;

@Component
public class BackJDBCTemplate {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BackJDBCTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Item> getNeedItems() {
        System.out.println("jdbcTemplate");
        return jdbcTemplate.query("select * from Needdo", (ResultSet resultSet, int rowNum) -> {
            return new Item(resultSet.getInt("id"), resultSet.getString("name"));
        });
    }

    public List<Item> getDoneItems() {
        System.out.println("jdbcTemplate");
        return jdbcTemplate.query("select * from Done", (ResultSet resultSet, int rowNum) -> {
            return new Item(resultSet.getInt("id"), resultSet.getString("name"));
        });
    }

    public void deleteNeedItem(int id) {
        try {
            jdbcTemplate.update("DELETE FROM Needdo WHERE id=?",id);
        }catch(DataAccessException dataAccessException){
        }
        jdbcTemplate.query("select * from Needdo", (ResultSet resultSet, int rowNum) -> {
            return new Item(resultSet.getInt("id"), resultSet.getString("name"));
        });
    }

    public void deleteDoneItem(int id) {
        try {
            jdbcTemplate.update("DELETE FROM Done WHERE id=?",id);
        }catch(DataAccessException dataAccessException){
        }
        jdbcTemplate.query("select * from Done", (ResultSet resultSet, int rowNum) -> {
            return new Item(resultSet.getInt("id"), resultSet.getString("name"));
        });
    }

    public void updateNeedItem(String name){
        jdbcTemplate.update("INSERT INTO Needdo( name) VALUES (?)", name);
    }

    public void updateDoneItem(String name){
        jdbcTemplate.update("INSERT INTO Done( name) VALUES (?)", name);
    }

//    public void itemtodone(int id){
//        SqlParameterSource namedParams = new MapSqlParameterSource()
//                .addValue("id",id);
//
//        List<Item> item = jdbcTemplate.query("select * from Needdo WHERE id = :id",namedParams, (resultSet, rowNum) -> {
//            return new Item(resultSet.getInt("id"), resultSet.getString("name"));
//        });
//    }

}
