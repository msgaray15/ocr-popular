package co.com.elbaiven.util;

import lombok.Data;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.Serializable;

@Data
public class LoggerMessage implements Serializable {

    private static final long serialVersionUID = 1l;
    private transient Logger logger;

    public LoggerMessage(String component){
        logger = LogManager.getLogger(component);
    }

    public void loggerInfo(String objeto){
        try{
            logger.info(objeto);
        }
        catch (Throwable e){
            logger.error("Error al construir mensaje del log: "+ e);
        }
    }

    public void loggerError(StackTraceElement stackTraceElement, Object objeto){
        try{
            logger.error(stackTraceElement.getMethodName(),objeto);
        }
        catch (Throwable e){
            logger.error("Error al construir mensaje del log: "+ e);
        }
    }
}
