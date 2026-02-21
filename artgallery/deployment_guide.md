# Vercel Deployment Guide

To deploy your LUMINARA gallery successfully and avoid the 404 error, follow these simple steps.

## Option 1: Using the Terminal (Fastest)

1. Open your terminal in the project directory.
2. Run the following command:
   ```bash
   npx vercel
   ```
3. Follow the prompts:
   - **Set up and deploy?** Yes
   - **Which scope?** (Your Vercel account)
   - **Link to existing project?** No (unless you want to overwrite)
   - **In which directory is your code located?** `./` (Press Enter)
   - **Want to modify other settings?** **YES**
   - **Root Directory?** Type `artgallery` and press Enter.
   - **The rest?** Press Enter to use defaults.

## Option 2: Using the Vercel Dashboard

If you prefer using the Vercel website:

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project**.
3. Import your GitHub repository or **Upload** the project folder.
4. **CRITICAL STEP**: Before clicking Deploy, find the **Framework Preset** or **Build & Development Settings**.
5. Locate **Root Directory** and set it to `artgallery`.
6. Click **Deploy**.

> [!TIP]
> Setting the **Root Directory** to `artgallery` is what fixes the "404: NOT_FOUND" error because your files are currently inside that folder.
