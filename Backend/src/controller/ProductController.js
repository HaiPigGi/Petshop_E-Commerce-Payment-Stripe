import Product from "../models/product.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
// Set up multer storage and file upload settings
const storage = multer.diskStorage({
  destination: './public/images',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

export const createProduct = async (req, res) => {
  try {
    // Use the `upload` middleware to handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Handle multer errors
        return res.status(400).json({ msg: err.message });
      } else if (err) {
        // Handle other errors
        return res.status(500).json({ msg: err.message });
      }

      // Check if no file is uploaded
      if (!req.file) {
        // Handle the case of no file uploaded
        const { name, jenis, harga } = req.body;
        await Product.create({
          name: name,
          jenis: jenis,
          harga: harga,
        });

        return res.status(201).json({ msg: 'Product Created Successfully' });
      }

      // Access the uploaded file using `req.file`
      const { name, jenis, harga } = req.body;
      const file = req.file;
      const ext = path.extname(file.originalname);
      const fileName = file.filename + ext;
      const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

      const allowedTypes = ['.png', '.jpg', '.jpeg'];
      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: 'Invalid Images' });
      }

      const fileSize = file.size;
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (fileSize > maxSize) {
        return res.status(422).json({ msg: 'Image must be less than 5MB' });
      }

      try {
        await fs.rename(file.path, `./public/images/${fileName}`);
        await Product.create({
          name: name,
          jenis: jenis,
          harga: harga,
          image: fileName,
          url: url
        });

        return res.status(201).json({ msg: 'Product Created Successfully' });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: 'Server Error' });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Use the `upload` middleware to handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Handle multer errors
        return res.status(400).json({ msg: err.message });
      } else if (err) {
        // Handle other errors
        return res.status(500).json({ msg: err.message });
      }

      const product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) return res.status(404).json({ msg: "No Data Found" });

      let fileName = product.image;

      if (req.file) {
        const file = req.file;
        const ext = path.extname(file.originalname);
        fileName = file.filename + ext;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];

        if (!allowedTypes.includes(ext.toLowerCase())) {
          return res.status(422).json({ msg: 'Invalid Images' });
        }

        const fileSize = file.size;
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (fileSize > maxSize) {
          return res.status(422).json({ msg: 'Image must be less than 5MB' });
        }

        try {
          await fs.rename(file.path, `./public/images/${fileName}`);
        } catch (error) {
          console.log(error.message);
          return res.status(500).json({ msg: 'Server Error' });
        }
      }

      const { name, jenis, harga } = req.body;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      try {
        await Product.update(
          { name: name, jenis: jenis, harga: harga, image: fileName, url: url },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.status(200).json({ msg: "Product Updated Successfully" });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server Error" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
