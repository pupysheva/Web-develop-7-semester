package ru.mirea.ItemService;

import java.util.List;

public class Resp {
    private boolean status;

    public Resp(boolean status) {
        this.status = status;
    }

    public Resp() {
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

}
