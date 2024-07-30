CREATE TABLE "performance"(
    "id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "text_id" INTEGER NOT NULL,
    "value" FLOAT(53) NOT NULL
);
ALTER TABLE
    "performance" ADD PRIMARY KEY("id");
CREATE TABLE "class_text"(
    "class_id" INTEGER NOT NULL,
    "text_id" INTEGER NOT NULL
);
ALTER TABLE
    "class_text" ADD PRIMARY KEY("class_id");
ALTER TABLE
    "class_text" ADD PRIMARY KEY("text_id");
CREATE TABLE "classes"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "color" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "classes" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" INTEGER NOT NULL,
    "avatar_url" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "texts"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "cover_url" VARCHAR(255) NULL
);
ALTER TABLE
    "texts" ADD PRIMARY KEY("id");
CREATE TABLE "questions"(
    "id" INTEGER NOT NULL,
    "text_id" INTEGER NOT NULL,
    "statement" VARCHAR(255) NOT NULL,
    "difficulty" INTEGER NOT NULL
);
ALTER TABLE
    "questions" ADD PRIMARY KEY("id");
CREATE TABLE "choices"(
    "id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "weight" FLOAT(53) NOT NULL,
    "statement" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "choices" ADD PRIMARY KEY("id");
CREATE TABLE "answers"(
    "id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "choice_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL
);
ALTER TABLE
    "answers" ADD PRIMARY KEY("id");
CREATE TABLE "class_user"(
    "class_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);
ALTER TABLE
    "class_user" ADD PRIMARY KEY("class_id");
ALTER TABLE
    "class_user" ADD PRIMARY KEY("user_id");
ALTER TABLE
    "performance" ADD CONSTRAINT "performance_text_id_foreign" FOREIGN KEY("text_id") REFERENCES "texts"("id");
ALTER TABLE
    "choices" ADD CONSTRAINT "choices_question_id_foreign" FOREIGN KEY("question_id") REFERENCES "questions"("id");
ALTER TABLE
    "classes" ADD CONSTRAINT "classes_id_foreign" FOREIGN KEY("id") REFERENCES "class_text"("class_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_id_foreign" FOREIGN KEY("id") REFERENCES "class_user"("user_id");
ALTER TABLE
    "performance" ADD CONSTRAINT "performance_student_id_foreign" FOREIGN KEY("student_id") REFERENCES "users"("name");
ALTER TABLE
    "classes" ADD CONSTRAINT "classes_teacher_id_foreign" FOREIGN KEY("teacher_id") REFERENCES "users"("id");
ALTER TABLE
    "answers" ADD CONSTRAINT "answers_student_id_foreign" FOREIGN KEY("student_id") REFERENCES "users"("id");
ALTER TABLE
    "class_text" ADD CONSTRAINT "class_text_text_id_foreign" FOREIGN KEY("text_id") REFERENCES "texts"("id");
ALTER TABLE
    "answers" ADD CONSTRAINT "answers_choice_id_foreign" FOREIGN KEY("choice_id") REFERENCES "choices"("id");
ALTER TABLE
    "answers" ADD CONSTRAINT "answers_question_id_foreign" FOREIGN KEY("question_id") REFERENCES "questions"("id");
ALTER TABLE
    "questions" ADD CONSTRAINT "questions_text_id_foreign" FOREIGN KEY("text_id") REFERENCES "texts"("id");
ALTER TABLE
    "classes" ADD CONSTRAINT "classes_id_foreign" FOREIGN KEY("id") REFERENCES "class_user"("class_id");