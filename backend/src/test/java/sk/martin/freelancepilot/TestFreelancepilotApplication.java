package sk.martin.freelancepilot;

import org.springframework.boot.SpringApplication;

public class TestFreelancepilotApplication {

	public static void main(String[] args) {
		SpringApplication.from(FreelancepilotApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
