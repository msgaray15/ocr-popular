package co.com.elbaiven.model.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
public class GenericDatetimeFormatter {
    private DateTimeFormatter dateTimeFormatter;
    private String zoneId;

    public GenericDatetimeFormatter(String format, String zoneId){
        dateTimeFormatter = DateTimeFormatter.ofPattern(format);
        this.zoneId = zoneId;
    }

    public String getDatetime(){
        ZonedDateTime zone = ZonedDateTime.now(ZoneId.of(zoneId));
        return zone.format(dateTimeFormatter);
    }
}
