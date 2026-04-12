import type { Topic } from "@/lib/problems";
import { topics } from "@/lib/problems";

export type Mcq = {
  id: string;
  topic: Topic;
  question: string;
  options: string[];
  answer: string;
};

const questionsByTopic: Record<
  Topic,
  Array<Omit<Mcq, "id" | "topic">>
> = {
  ownership: [
    {
      question: "What happens when a String is assigned to another variable?",
      options: ["It is moved", "It is copied", "It is deleted", "It becomes static"],
      answer: "It is moved"
    },
    {
      question: "Which method creates a deep copy of owned heap data?",
      options: ["clone()", "move()", "borrow()", "drop_ref()"],
      answer: "clone()"
    },
    {
      question: "What does Rust call the variable that controls when a value is dropped?",
      options: ["Owner", "Borrower", "Trait", "Module"],
      answer: "Owner"
    },
    {
      question: "When is an owned value usually dropped?",
      options: ["When its owner goes out of scope", "When it is printed", "When it is borrowed", "Before main starts"],
      answer: "When its owner goes out of scope"
    },
    {
      question: "Which type commonly demonstrates move semantics?",
      options: ["String", "i32", "bool", "char"],
      answer: "String"
    },
    {
      question: "Why can many integers still be used after assignment?",
      options: ["They implement Copy", "They are always references", "They are never owned", "They live on the internet"],
      answer: "They implement Copy"
    },
    {
      question: "What keyword can transfer ownership into a closure?",
      options: ["move", "own", "take", "send"],
      answer: "move"
    },
    {
      question: "Which function explicitly releases a value early?",
      options: ["drop", "free", "delete", "release"],
      answer: "drop"
    },
    {
      question: "Can two variables own the same String at the same time by default?",
      options: ["No", "Yes", "Only in debug builds", "Only inside loops"],
      answer: "No"
    },
    {
      question: "What is returned when ownership is moved into and then out of a function?",
      options: ["The owned value", "A compiler warning", "A dangling pointer", "A mutable borrow"],
      answer: "The owned value"
    }
  ],
  borrowing: [
    {
      question: "Which symbol creates an immutable reference?",
      options: ["&", "*", "!", "::"],
      answer: "&"
    },
    {
      question: "What is borrowing mainly used for?",
      options: ["Accessing a value without taking ownership", "Deleting a value", "Changing a type name", "Creating a crate"],
      answer: "Accessing a value without taking ownership"
    },
    {
      question: "How many immutable references can exist at the same time?",
      options: ["Many", "Only one", "Zero", "Exactly two"],
      answer: "Many"
    },
    {
      question: "What does dereferencing let you do?",
      options: ["Access the value behind a reference", "Import a module", "Create a macro", "End a scope"],
      answer: "Access the value behind a reference"
    },
    {
      question: "What does a reference point to?",
      options: ["An existing value", "A package name", "A compiler flag", "A new thread"],
      answer: "An existing value"
    },
    {
      question: "Which syntax is a string slice type?",
      options: ["&str", "StringRef", "str&", "slice String"],
      answer: "&str"
    },
    {
      question: "What does Rust prevent with its borrow checker?",
      options: ["Dangling references", "All loops", "All heap allocation", "All match expressions"],
      answer: "Dangling references"
    },
    {
      question: "Can an immutable reference change the borrowed value?",
      options: ["No", "Yes", "Only in release mode", "Only for String"],
      answer: "No"
    },
    {
      question: "Which function parameter borrows a String immutably?",
      options: ["name: &String", "name: String", "mut name: String", "name: owned String"],
      answer: "name: &String"
    },
    {
      question: "What must happen before a value can be moved after borrowing?",
      options: ["The borrow must no longer be used", "The value must be cloned twice", "The program must sleep", "The value must be printed"],
      answer: "The borrow must no longer be used"
    }
  ],
  mutability: [
    {
      question: "Which keyword makes a binding mutable?",
      options: ["mut", "letmut", "change", "var"],
      answer: "mut"
    },
    {
      question: "Is a Rust variable mutable by default?",
      options: ["No", "Yes", "Only numbers are", "Only strings are"],
      answer: "No"
    },
    {
      question: "Which syntax creates a mutable reference?",
      options: ["&mut value", "&value mut", "mut& value", "*mut value"],
      answer: "&mut value"
    },
    {
      question: "How many mutable references to the same value can be active at once?",
      options: ["One", "Many", "Zero always", "Exactly three"],
      answer: "One"
    },
    {
      question: "Which method mutates a Vec by adding an item?",
      options: ["push", "add", "append_one", "insert_back"],
      answer: "push"
    },
    {
      question: "What does shadowing allow?",
      options: ["Reusing a variable name with a new binding", "Skipping ownership checks", "Changing compiler versions", "Creating a private module"],
      answer: "Reusing a variable name with a new binding"
    },
    {
      question: "Can a mutable binding change value after creation?",
      options: ["Yes", "No", "Only once", "Only if it is i32"],
      answer: "Yes"
    },
    {
      question: "Which declaration lets you push onto a String?",
      options: ["let mut text = String::new();", "let text = String::new();", "const text = String::new();", "static text = String::new();"],
      answer: "let mut text = String::new();"
    },
    {
      question: "What does mut belong to in let mut score = 0?",
      options: ["The binding", "The integer type", "The file", "The module"],
      answer: "The binding"
    },
    {
      question: "Can you have immutable borrows while a mutable borrow is active?",
      options: ["No", "Yes", "Only for Vec", "Only inside main"],
      answer: "No"
    }
  ],
  structs: [
    {
      question: "Which keyword defines a struct?",
      options: ["struct", "shape", "object", "record"],
      answer: "struct"
    },
    {
      question: "How do you access a named struct field?",
      options: ["value.field", "value->field", "value::field", "field(value)"],
      answer: "value.field"
    },
    {
      question: "What is a tuple struct?",
      options: ["A struct with unnamed fields", "A struct with no fields", "A tuple inside a Vec", "A function that returns a tuple"],
      answer: "A struct with unnamed fields"
    },
    {
      question: "Where are methods for a struct usually defined?",
      options: ["impl block", "use block", "enum block", "match arm"],
      answer: "impl block"
    },
    {
      question: "What does Self usually refer to inside an impl block?",
      options: ["The current type", "The current file", "The current crate", "The current loop"],
      answer: "The current type"
    },
    {
      question: "Which syntax creates a Point with named fields?",
      options: ["Point { x: 1, y: 2 }", "Point( x: 1, y: 2 )", "Point[1, 2]", "new Point(1, 2)"],
      answer: "Point { x: 1, y: 2 }"
    },
    {
      question: "What does #[derive(Debug)] help with?",
      options: ["Printing with debug formatting", "Making fields mutable", "Moving ownership", "Creating a database table"],
      answer: "Printing with debug formatting"
    },
    {
      question: "What is a unit-like struct?",
      options: ["A struct with no fields", "A struct with one i32 field", "A struct inside a unit test", "A struct that cannot compile"],
      answer: "A struct with no fields"
    },
    {
      question: "Can struct fields have different types?",
      options: ["Yes", "No", "Only in enums", "Only if public"],
      answer: "Yes"
    },
    {
      question: "What does &self mean in a method?",
      options: ["Borrow the instance immutably", "Move the instance", "Delete the instance", "Create a new instance"],
      answer: "Borrow the instance immutably"
    }
  ],
  enums: [
    {
      question: "Which keyword defines an enum?",
      options: ["enum", "variant", "choice", "union"],
      answer: "enum"
    },
    {
      question: "What is an enum variant?",
      options: ["One possible value of an enum", "A private function", "A compiler error", "A package version"],
      answer: "One possible value of an enum"
    },
    {
      question: "Which expression is commonly used with enums?",
      options: ["match", "goto", "switch!", "select"],
      answer: "match"
    },
    {
      question: "What does Option represent?",
      options: ["A value that may be present or absent", "A command line flag only", "A mutable reference", "A package manager"],
      answer: "A value that may be present or absent"
    },
    {
      question: "Which are the variants of Option?",
      options: ["Some and None", "Ok and Err", "True and False", "Left and Right"],
      answer: "Some and None"
    },
    {
      question: "Which are the variants of Result?",
      options: ["Ok and Err", "Some and None", "Start and Stop", "Pass and Fail"],
      answer: "Ok and Err"
    },
    {
      question: "Can enum variants hold data?",
      options: ["Yes", "No", "Only strings", "Only unit values"],
      answer: "Yes"
    },
    {
      question: "What must match arms usually be?",
      options: ["Exhaustive", "Mutable", "Public", "Async"],
      answer: "Exhaustive"
    },
    {
      question: "Which syntax creates a Some value?",
      options: ["Some(5)", "Option:5", "Some { 5 }", "Maybe(5)"],
      answer: "Some(5)"
    },
    {
      question: "What does if let help with?",
      options: ["Matching one pattern concisely", "Creating a struct", "Importing a crate", "Starting a loop"],
      answer: "Matching one pattern concisely"
    }
  ],
  "error-handling": [
    {
      question: "Which enum is commonly used for recoverable errors?",
      options: ["Result", "Option", "ErrorOnly", "Panic"],
      answer: "Result"
    },
    {
      question: "What does Ok(value) usually mean?",
      options: ["The operation succeeded", "The operation panicked", "The value is missing", "The value was moved"],
      answer: "The operation succeeded"
    },
    {
      question: "What does Err(error) usually mean?",
      options: ["The operation failed recoverably", "The compiler is missing", "The value is always zero", "The code is optimized"],
      answer: "The operation failed recoverably"
    },
    {
      question: "What does the ? operator do with a Result?",
      options: ["Returns early on Err", "Ignores every error", "Converts everything to String", "Starts a new thread"],
      answer: "Returns early on Err"
    },
    {
      question: "Which macro stops execution with an unrecoverable error?",
      options: ["panic!", "stop!", "error!", "break!"],
      answer: "panic!"
    },
    {
      question: "What type is returned by parse::<i32>()?",
      options: ["Result<i32, _>", "i32 always", "Option<String>", "bool"],
      answer: "Result<i32, _>"
    },
    {
      question: "Which method gives a fallback value for Result or Option?",
      options: ["unwrap_or", "panic_or", "fallback!", "default_if"],
      answer: "unwrap_or"
    },
    {
      question: "Why should unwrap be used carefully?",
      options: ["It can panic", "It always clones", "It skips compilation", "It creates memory leaks"],
      answer: "It can panic"
    },
    {
      question: "What does expect add compared with unwrap?",
      options: ["A custom panic message", "A mutable reference", "A faster loop", "A new enum variant"],
      answer: "A custom panic message"
    },
    {
      question: "Which pattern handles both Result outcomes?",
      options: ["match result { Ok(v) => ..., Err(e) => ... }", "if result == true", "loop result", "use result::*"],
      answer: "match result { Ok(v) => ..., Err(e) => ... }"
    }
  ],
  collections: [
    {
      question: "Which collection stores values in order and can grow?",
      options: ["Vec", "HashMap", "HashSet", "String only"],
      answer: "Vec"
    },
    {
      question: "Which macro creates a vector?",
      options: ["vec!", "list!", "array!", "values!"],
      answer: "vec!"
    },
    {
      question: "Which collection stores key-value pairs?",
      options: ["HashMap", "Vec", "HashSet", "Tuple"],
      answer: "HashMap"
    },
    {
      question: "Which collection stores unique values?",
      options: ["HashSet", "Vec", "String", "Range"],
      answer: "HashSet"
    },
    {
      question: "Which method adds an item to the end of a Vec?",
      options: ["push", "put", "store", "add_end"],
      answer: "push"
    },
    {
      question: "Which method reads a Vec item safely by index?",
      options: ["get", "read", "take_at", "index_safe"],
      answer: "get"
    },
    {
      question: "What does HashMap::insert do?",
      options: ["Adds or replaces a key-value pair", "Sorts all keys", "Deletes the map", "Creates a Vec"],
      answer: "Adds or replaces a key-value pair"
    },
    {
      question: "What does iter() usually create?",
      options: ["An iterator over references", "A clone of every item", "A new compiler target", "A mutable owner"],
      answer: "An iterator over references"
    },
    {
      question: "Which method returns the number of items?",
      options: ["len", "count_now", "size_of_type", "total!"],
      answer: "len"
    },
    {
      question: "Which import is commonly needed for HashMap?",
      options: ["use std::collections::HashMap;", "use rust::HashMap;", "use std::map::*;", "use crate::HashMap;"],
      answer: "use std::collections::HashMap;"
    }
  ]
};

export const mcqs: Mcq[] = topics.flatMap((topic) =>
  questionsByTopic[topic].map((question, index) => ({
    ...question,
    id: `${topic}-${index + 1}`,
    topic
  }))
);

export function getMcqsByTopic(topic: string) {
  return mcqs.filter((mcq) => mcq.topic === topic);
}

export function getMcqTopicSummaries() {
  return topics.map((topic) => ({
    topic,
    count: getMcqsByTopic(topic).length
  }));
}
