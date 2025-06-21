import "@testing-library/jest-dom";
import MatchMediaMock from "jest-matchmedia-mock";

let matchMedia: MatchMediaMock;

beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterAll(() => {
  matchMedia.clear();
});

jest.useFakeTimers();
