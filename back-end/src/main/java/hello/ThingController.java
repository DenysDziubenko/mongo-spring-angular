package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class ThingController {

    @Autowired
    ThingRepository repo;

    @GetMapping("/api/things")
    public List<Thing> listItems(@RequestParam(value = "name", defaultValue = "") String name) {

        if(name != null) {
            return repo.findCustomByRegExAddress(name);
        }

        return repo.findAll();
    }

    @GetMapping("/api/things/{id}")
    public Optional<Thing> item(@PathVariable("id") String id) {
        return repo.findById(id);
    }

    @PostMapping("/api/things")
    public Thing createItem(@RequestBody Thing thing) {
        return repo.save(thing);
    }

    @PutMapping("/api/things")
    public Thing updateItem(@RequestBody Thing thing) {
        return repo.save(thing);
    }

    @DeleteMapping("/api/things/{id}")
    public void deleteItem(@PathVariable("id") String id) {
        repo.deleteById(id);
    }
}
