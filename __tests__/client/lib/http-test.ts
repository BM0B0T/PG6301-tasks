import {
  fetchJson,
  HttpException,
  postJson,
} from "../../../src/client/lib/http";

let post: string;
beforeEach(() => {
  post = "";
  // @ts-ignore
  global.fetch = jest.fn((input: string, options: RequestInit) => {
    // @ts-ignore
    post = options?.body;
    return Promise.resolve({
      status: 201,
      ok: true,
      json: () => Promise.resolve({ test: "test" }),
    });
  });
});

it("should post", async () => {
  const a = { test: "test" };
  await postJson("/", a);
  expect(JSON.parse(post)).toEqual(a);
});

it("should throw HttpException", async () => {
  // @ts-ignore
  global.fetch.mockImplementation(() =>
    Promise.resolve({
      status: 400,
      ok: false,
    })
  );
  const a = { test: "test" };
  try {
    await postJson("/", a);
  } catch (e) {
    expect(e).toBeInstanceOf(HttpException);
  }
});

it("should fetch", async () => {
  const a = await fetchJson("/");
  expect(a).toEqual({ test: "test" });
});

it("should throw HttpException", async () => {
  // @ts-ignore
  global.fetch.mockImplementation(() =>
    Promise.resolve({
      status: 400,
      ok: false,
    })
  );
  try {
    await fetchJson("/");
  } catch (e) {
    expect(e).toBeInstanceOf(HttpException);
  }
});
