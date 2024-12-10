import { renderPhotos } from "./photoRender.js";
import { generatePhotos } from "./data.js";

const photos = generatePhotos();
renderPhotos(photos);
