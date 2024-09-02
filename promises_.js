//Solution to Problem 1
const setDelayParams = (delayInMs) => {
  return new Promise((resolve, reject) => {
    if (delayInMs <= 0) {
      reject("Delay Secs. cannot be Zero or negative");
    } else {
      setTimeout(resolve, delayInMs);
    }
  });
};

const iteratewithAsyncAwait = async (arryd) => {
  for (val of arryd) {
    try {
      console.log(val);
      await setDelayParams(-1000);
    } catch (error) {
      console.log(error);
      break;
    }
  }
};

//Testing Solution #1
iteratewithAsyncAwait([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

//Solution to Problem 2
const awaitCall = async () => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const dataObject = await data.json();
    console.log(dataObject);
  } catch (error) {
    //Solution for Handling Error
    console.log(`Fail to load data resource : ${error}`);
  }
};

//Testing Solution #2
awaitCall();

//Solution for Problem 3
const log1 = async () => {
  await setDelayParams(1000);
  console.log("#1 Hello World");
};

const log2 = async () => {
  await setDelayParams(1000);
  console.log("#2 Hello World");
};

const log3 = async () => {
  await setDelayParams(1000);
  console.log("#3 Hello World");
};

const chainedAsyncFunctions = async () => {
  await log1();
  await log2();
  await log3();
};

//Testing Solution #3
chainedAsyncFunctions();

//Solution for Problem 4

const concurrentRequests = async () => {
  try {
    const [fetchPosts, fetchTodos] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/todos"),
    ]);

    const [posts, todos] = await Promise.all([
      fetchPosts.json(),
      fetchTodos.json(),
    ]);
    console.log(posts);
    console.log(todos);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

// Testing concurrent call solution
concurrentRequests();

//Solution for Problem 5
const parallelCalls = async (urlArray) => {
  try {
    const fetchResponses = urlArray.map((eachUrl) => fetch(eachUrl));
    const responses = await Promise.all(fetchResponses);

    const dataJson = responses.map(async (response) => {
      if (!response.ok)
        throw new Error(
          `Error fetching API from : ${response.url}, statustext : ${response.statusText}`
        );
      return response.json();
    });

    const data = await Promise.all(dataJson);
    console.log(data);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

// Testing Parallel call solution
parallelCalls([
  "https://jsonplaceholder.typicode.com/todos",
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
]);
