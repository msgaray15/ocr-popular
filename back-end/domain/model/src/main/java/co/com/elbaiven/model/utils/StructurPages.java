package co.com.elbaiven.model.utils;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class StructurPages {
    private Long totalRecords;
    private Integer last;
    private Integer current;
    private Integer next;

}
