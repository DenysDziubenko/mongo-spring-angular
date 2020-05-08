package hello;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import hello.Thing;

public interface ThingRepository extends MongoRepository<Thing, String> {
    @Query("{name : { $regex: ?0 } }")
    List<Thing> findCustomByRegExAddress(String domain);
}
