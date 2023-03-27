package co.com.elbaiven.model.utils;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder(toBuilder = true)
public class ModelListCompleteWithPages {
    private List<Object> list;
    private StructurPages pages;

    public static ModelListCompleteWithPages getModelListCompleteWithPages(List<Object> list, Long count, Integer page, Integer pageSize) {
        Double countPageSize = (double) count / pageSize;
        Integer countPages = (int) ((countPageSize % 1) > 0 ? countPageSize + 1 : countPageSize);
        Integer last = page > 1 ? page - 1 : 0;
        Integer next = countPages > page ? page + 1 : 0;
        StructurPages structurPages = StructurPages.builder()
                .totalRecords(count)
                .last(last)
                .current(page)
                .next(next)
                .build();
        return ModelListCompleteWithPages.builder()
                .list(list)
                .pages(structurPages)
                .build();
    }
}
