CREATE TABLE "tasks" (
	id SERIAL PRIMARY KEY,
	"complete" BOOLEAN,
	"task" VARCHAR(300)
	);

    
INSERT INTO tasks ("complete", "task")
	VALUES (TRUE, 'take out the garbage'),
	(FALSE, 'clean up dog poop');

	
