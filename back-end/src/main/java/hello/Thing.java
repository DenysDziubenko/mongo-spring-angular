package hello;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "thingtobuys")
public class Thing {

	@Id
	private String id;
	private String name;
	private String description;
	private int scores;
	
	public Thing(String name, String description, int scores) {
		this.name = name;
		this.description = description;
		this.scores = scores;
	}
}
