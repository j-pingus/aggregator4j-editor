package lu.jpingus.aggregator4jeditor.backend.resources;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

public abstract class FileBasedController {
    final File baseFolder;

    FileBasedController(String path) {
        baseFolder = getOrCreateBaseFolder(path, this.getClass().getSimpleName() + "-folder");
    }

    public File getBaseFolder() {
        return baseFolder;
    }

    private File getOrCreateBaseFolder(String path, String defaultPath) {
        if (StringUtils.isEmpty(path)) {
            path = defaultPath;
        }
        File ret = new File(path);
        if (ret.exists() && ret.isDirectory()) return ret;
        if (ret.exists()) throw new Error(ret + " is not a folder");
        if (ret.getAbsoluteFile().getParentFile().canWrite()) {
            ret.mkdirs();
            return ret;
        }
        throw new Error(ret + " could not be created");

    }

}
