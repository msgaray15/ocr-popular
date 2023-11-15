package co.com.elbaiven.usecase.control.util;

import lombok.Data;


public class ControlVigilante {
    public static final String DANGER = "danger";
    public static final String WARNING = "warning";
    public static final String SUCCESS = "success";
    public static String key = WARNING;
    public static String placa = "default";
    public static String state = "default";
    public static String date = "default";

    public static String toString = "{\n" +
            "    \"key\":\"" + key + "\",\n" +
            "    \"placa\": \"" + placa + "\",\n" +
            "    \"state\": \"" + state + "\",\n" +
            "    \"date\": \""+date+"\"\n" +
            "}";
}
