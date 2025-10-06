# 🚀 ApplyDash - DigitalOcean Deployment Guide

This guide will help you deploy ApplyDash to DigitalOcean App Platform with a managed PostgreSQL database.

## 📋 Prerequisites

- DigitalOcean account with student credits
- GitHub repository with your ApplyDash code
- Supabase project for authentication

## 🛠️ Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for DigitalOcean deployment"
   git push origin main
   ```

2. **Verify these files exist** in your repository:
   - `Dockerfile`
   - `.env.example`
   - `next.config.ts` (updated)
   - `scripts/migrate.sh`

## 🐘 Step 2: Create PostgreSQL Database

1. **Login to DigitalOcean Dashboard**
2. **Navigate to Databases** → **Create Database**
3. **Configure Database**:
   - Engine: PostgreSQL
   - Version: 14 or higher
   - Plan: Basic ($15/month, but free with student credits)
   - Datacenter: Choose closest to your users
   - Database Name: `applydash`
   - User: `applydash_user`

4. **Wait for database creation** (5-10 minutes)
5. **Note down the connection details** - you'll need them later

## 🌐 Step 3: Deploy with App Platform

1. **Navigate to App Platform** → **Create App**

2. **Connect GitHub Repository**:
   - Choose your ApplyDash repository
   - Branch: `main`
   - Auto-deploy: Enable

3. **Configure App Settings**:
   - Name: `applydash`
   - Region: Same as your database
   - Plan: Basic ($5/month, free with student credits)

4. **Environment Variables**:
   Click "Edit" on your app and add these environment variables:
   
   ```env
   # Database (get from your DigitalOcean database)
   DATABASE_URL=postgresql://applydash_user:password@host:port/applydash
   
   # Supabase (get from your Supabase project)
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # JWT Secret (generate a random string)
   JWT_SECRET=your_random_jwt_secret_here
   
   # Production settings
   NODE_ENV=production
   NEXTAUTH_URL=https://your-app-name.ondigitalocean.app
   NEXTAUTH_SECRET=another_random_secret
   ```

5. **Add Run Command**:
   - Build Command: `pnpm build`
   - Run Command: `pnpm start`

6. **Deploy the App** - Click "Create Resources"

## 🔄 Step 4: Run Database Migrations

After your app is deployed, you need to run the database migrations:

1. **Access Console** in your DigitalOcean app
2. **Run migration script**:
   ```bash
   bash scripts/migrate.sh
   ```

## ✅ Step 5: Configure Supabase

Update your Supabase project settings:

1. **Authentication** → **URL Configuration**:
   - Site URL: `https://your-app-name.ondigitalocean.app`
   - Redirect URLs: Add your DigitalOcean app URL

2. **API Keys**: Ensure you're using the correct keys in your environment variables

## 🔒 Step 6: Security Configuration

1. **Custom Domain** (Optional):
   - Add your custom domain in App Platform
   - Update NEXTAUTH_URL to your custom domain

2. **Environment Variables Security**:
   - Never commit `.env` files to Git
   - Use DigitalOcean's encrypted environment variables

## 📊 Step 7: Monitoring and Logs

1. **App Logs**: Check real-time logs in DigitalOcean dashboard
2. **Database Metrics**: Monitor database performance
3. **App Metrics**: Monitor app performance and uptime

## 🚀 Step 8: Testing Your Deployment

1. **Visit your app**: `https://your-app-name.ondigitalocean.app`
2. **Test functionality**:
   - User registration
   - User login
   - Job tracking features
   - Data persistence

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Errors**:
   - Verify DATABASE_URL format
   - Check database is running
   - Confirm network connectivity

2. **Supabase Authentication Issues**:
   - Verify SUPABASE_URL and SUPABASE_ANON_KEY
   - Check redirect URLs in Supabase settings

3. **Build Failures**:
   - Check build logs in DigitalOcean dashboard
   - Verify all dependencies in package.json
   - Ensure Node.js version compatibility

4. **Migration Errors**:
   - Run migrations manually in console
   - Check database permissions
   - Verify Prisma schema

### Useful Commands:

```bash
# Check app status
docker ps

# View logs
docker logs container-name

# Run migrations manually
npx prisma migrate deploy

# Check database connection
npx prisma db pull
```

## 💰 Cost Estimation

With student credits:
- **App Platform**: $5/month (FREE with credits)
- **PostgreSQL Database**: $15/month (FREE with credits)
- **Total**: ~$20/month (FREE for 1 year with student credits)

## 🔄 Continuous Deployment

Your app will automatically redeploy when you push to the main branch. To deploy updates:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

## 🎉 Success!

Your ApplyDash application should now be live and accessible worldwide! 

**Next Steps**:
- Set up monitoring and alerts
- Configure backup strategies
- Consider adding a CDN for better performance
- Monitor usage and scale as needed

---

**Need Help?** Check the [DigitalOcean Documentation](https://docs.digitalocean.com/products/app-platform/) or contact support.