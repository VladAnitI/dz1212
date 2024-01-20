enum Grade {
	'A+' = 100,
	'A' = 90,
	'B' = 80,
	'C' = 70
}

class Student {
	name: string;
	id: number;
	courses: Course[];

	constructor(name: string, id: number) {
		this.name = name;
		this.id = id;
		this.courses = [];
	}

	addCourse(courseName: string) {
		const course = new Course(courseName);
		this.courses.push(course);
	}

	addGrade(courseName: string, grade: number | string) {
		const course = this.findCourse(courseName);
		if (course) {
			if (typeof grade === 'string') {
				grade = Grade[grade as keyof typeof Grade] as number;
			}
			course.grades.push(grade);
			course.updateAvgGrade();
		}
	}

	displayStudentInfo() {
		console.log('Student Information:');
		console.log(`Name: ${this.name}`);
		console.log(`ID: ${this.id}`);
		console.log('Courses:');
		for (const course of this.courses) {
			console.log(
				`- ${course.courseName}: ${course.grades.join(', ')}, avg: ${
					course.avgGrade
				}`
			);
		}
	}

	private findCourse(courseName: string) {
		return this.courses.find((course) => course.courseName === courseName);
	}
}

class InterStudent extends Student {
	country: string;

	constructor(name: string, id: number, country: string) {
		super(name, id);
		this.country = country;
	}

	displayStudentInfo() {
		super.displayStudentInfo();
		console.log(`Country: ${this.country}`);
	}
}

class Course {
	courseName: string;
	grades: (number | string)[];
	avgGrade: number;

	constructor(courseName: string) {
		this.courseName = courseName;
		this.grades = [];
		this.avgGrade = 0;
	}

	updateAvgGrade() {
		if (this.grades.length > 0) {
			const sum: number | string = this.grades.reduce(
				(accum :number, grade) => accum + Number(grade),
				0
			);
			if (typeof sum == 'number') this.avgGrade = sum / this.grades.length;
		}
	}
}

const student1 = new Student('John Doe', 12345);

student1.addCourse('Math');
student1.addCourse('History');

student1.addGrade('Math', 95);
student1.addGrade('Math', 95);
student1.addGrade('History', 80);

student1.displayStudentInfo();
// Student Information:
// Name: John Doe
// ID: 12345
// Courses:
// - Math: 95, 95, avg: 95
// - History: 80, avg: 80

const interStudent1 = new InterStudent('Alice Wonderland', 56789, 'USA');

interStudent1.addCourse('Physics');
interStudent1.addCourse('Literature');

interStudent1.addGrade('Physics', 'A+');
interStudent1.addGrade('Physics', 'A');
interStudent1.addGrade('Literature', 'B');

interStudent1.displayStudentInfo();
// Student Information:
// Name: Alice Wonderland
// ID: 56789
// Country: USA
// Courses:
// - Physics: 100, 90, avg: 95
// - Literature: 80, avg: 80