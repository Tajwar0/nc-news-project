const request = require("supertest");
const connection = require(`../db/connection`);
const app = require(`${__dirname}/../app`);
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
beforeEach(() => seed(testData));
afterAll(() => connection.end());

const neededKeys = [
  "author",
  "title",
  "article_id",
  "body",
  "topic",
  "created_at",
  "votes",
];

describe("Name of the group", () => {
  describe("3 GET api topics", () => {
    it("respond with an array of topic objects, including properties'slug' and 'description ", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(testData.topicData);
        });
    });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("responds with an article object with the following properties: author, title, article_id, body, topic, created_at, votes", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(neededKeys.every((key) => key in body)).toEqual(true);
      });
  });
});
const expectedTopics = [
  { description: "The man, the Mitch, the legend", slug: "mitch" },
  { description: "Not dogs", slug: "cats" },
  { description: "what books are made of", slug: "paper" },
];

describe("topics api", () => {
  describe("handles bad paths", () => {
    it("responds with 404 and message if get request path does not exist", () => {
      return request(app)
        .get("/api/bad_path")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid path");
        });
    });
  });
});

describe("3 GET api topics", () => {
  it("respond with an array of topic objects, including properties'slug' and 'description ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        console.log(topics);
        expect(topics).toEqual(expectedTopics);
      });
  });
});
