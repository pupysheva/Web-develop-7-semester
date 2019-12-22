package ru.mirea.ItemService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.ConfigurableApplicationContext;

@ServletComponentScan
@SpringBootApplication
public class ApplicationBackend {
    public static void main(String[] arg){
        ConfigurableApplicationContext context = SpringApplication.run(ApplicationBackend.class);//Создали приложение
        context.getBean(ItemDB.class).init();
    }
}