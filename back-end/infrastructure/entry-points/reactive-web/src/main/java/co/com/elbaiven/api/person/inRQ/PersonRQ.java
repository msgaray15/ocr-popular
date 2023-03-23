package co.com.elbaiven.api.person.inRQ;

import lombok.Data;

@Data
public class PersonRQ {
    private Long identification;
    private String name;
    private Long phone;
    private String address;
}
