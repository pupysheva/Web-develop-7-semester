package ru.mirea.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ItemController {

    @Autowired
    private BackJDBCTemplate backJDBCTemplate;

    @RequestMapping(value = "api/get_needitems", method = RequestMethod.GET)
    @ResponseBody
    public List<Item> get_items() {
        return backJDBCTemplate.getNeedItems();
    }

    @RequestMapping(value = "api/get_done", method = RequestMethod.GET)
    @ResponseBody
    public List<Item> get_done() {
        return backJDBCTemplate.getDoneItems();
    }

    @RequestMapping(value = "api/delete_needitem/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Resp delete_item(@PathVariable int id ) {
        backJDBCTemplate.deleteNeedItem(id);
        return new Resp(true);
    }
    @RequestMapping(value = "api/delete_doneitem/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Resp delete_doneitem(@PathVariable int id ) {
        backJDBCTemplate.deleteDoneItem(id);
        return new Resp(true);
    }

    @RequestMapping(value = "api/update_needitem/{name}", method = RequestMethod.GET)
    @ResponseBody
    public Resp update_needitem(@PathVariable String name){
        backJDBCTemplate.updateNeedItem(name);
        return new Resp(true);
    }

    @RequestMapping(value = "api/update_doneitem/{name}", method = RequestMethod.GET)
    @ResponseBody
    public Resp update_doneitem(@PathVariable String name){
        System.out.println(name);
        backJDBCTemplate.updateDoneItem(name);
        return new Resp(true);
    }

//    @RequestMapping(value = "api/itemdone/{id}", method = RequestMethod.GET)
//    @ResponseBody
//    public void itemtodone(@PathVariable int id){
//        backJDBCTemplate.updateDoneItem(name);
//    }

//    @PostMapping("/api")
//    public ResponseEntity<Resp> doSomething(@RequestBody ReqBody reqBody){
//        Resp resp = null;
//        switch (reqBody.getMethod()){
//            case "get":{
//                resp = new Resp(reqBody.getMethod(), true, backJDBCTemplate.geItems());
//                break;
//            }
//            case "delete":{
//                resp = new Resp(reqBody.getMethod(), true, backJDBCTemplate.deleteItem(reqBody.getPost().getId()));
//                break;
//            }
//            default:{
//                break;
//            }
//        }
//        System.out.println(resp.getMethod()+"   "+resp.getItem());
//        return new ResponseEntity<Resp>(resp, HttpStatus.OK);
//    }
}