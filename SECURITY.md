# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Next Resume Pro seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Do NOT** open a public GitHub issue for security vulnerabilities
2. Email security concerns to: [dev.winter191@passinbox.com](mailto:dev.winter191@passinbox.com)
3. Include the following information:
   - Type of vulnerability
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if available)
   - Impact of the issue, including how an attacker might exploit it

### What to Expect

- **Initial Response**: Within 48 hours of your report
- **Status Update**: We'll keep you informed about the progress of fixing the vulnerability
- **Resolution**: We aim to release a fix within 7-14 days for critical issues
- **Credit**: With your permission, we'll acknowledge your responsible disclosure in the fix announcement

## Security Considerations

### Environment Variables

This project uses several sensitive environment variables. **Never commit `.env` files to version control.**

Critical variables that require secure handling:
- `GITHUB_TOKEN` - GitHub API personal access token
- `EMAIL_SERVICE_*` - Email service credentials (SendGrid, Resend, SMTP)
- `REDIS_URL` - Redis connection string (if using external service)
- `CONTACT_FORM_WEBHOOK_URL` - Webhook endpoints
- `SECRET_KEY` - Any custom secret keys for encryption

See [.env.example](.env.example) for a complete security checklist.

### Production Deployment

Before deploying to production:

1. **Environment Security**
   - Set `NODE_ENV=production`
   - Disable debug features: `DEBUG_ALLOW_READ=false`
   - Use strong, unique secrets for all credentials
   - Enable HTTPS only

2. **Rate Limiting**
   - Contact form has built-in rate limiting (5 requests per hour)
   - Consider adding additional rate limiting at infrastructure level
   - Monitor for abuse patterns

3. **Content Security**
   - Review all user-generated content fields
   - Sanitize inputs (honeypot protection included)
   - Be cautious with `dangerouslySetInnerHTML` usage

4. **Dependencies**
   - Regularly run `npm audit` to check for vulnerabilities
   - Keep dependencies up to date
   - Review security advisories for Next.js and React

5. **API Security**
   - GitHub API tokens should have minimal required scopes
   - Email service tokens should be restricted to sending only
   - Use environment-specific credentials

### Known Security Features

✅ **Implemented**
- Rate limiting on contact form submissions
- Honeypot spam protection
- Environment-based feature flags
- Secure external link handling (`rel="noopener noreferrer"`)
- Input validation on contact forms
- CSRF protection via Next.js built-in security
- Sanitized MDX rendering for blog posts

⚠️ **User Responsibility**
- Configure CSP (Content Security Policy) headers in production
- Set up proper CORS policies if using API routes
- Enable HTTPS and HSTS headers
- Configure secure cookie policies
- Set up monitoring and logging for security events

## Security Best Practices for Users

If you're deploying this template:

1. **Change Default Credentials**: Update all example credentials in `.env.example`
2. **Limit API Scopes**: Use minimum required permissions for GitHub and email tokens
3. **Regular Updates**: Keep Next.js and dependencies updated
4. **Monitor Logs**: Watch for suspicious activity in form submissions
5. **Backup Data**: Regularly backup any user data or content
6. **Review Code**: Audit any customizations you make for security issues

## Vulnerability Disclosure Policy

We follow a coordinated vulnerability disclosure process:

1. Security researchers report vulnerabilities privately
2. We acknowledge and investigate the report
3. We develop and test a fix
4. We release the fix and credit the researcher (with permission)
5. Full disclosure after users have had time to update

## Third-Party Dependencies

This project relies on:
- Next.js (framework security)
- React (XSS protection)
- Tailwind CSS (no runtime security concerns)
- Various npm packages (regularly audited)

Security issues in dependencies are addressed through:
- Automated Dependabot alerts
- Regular manual audits
- Quick patching when vulnerabilities are discovered

## License Security Note

This project uses dual licensing:
- **Code**: MIT License (permissive, use at your own risk)
- **UI/Design**: CC BY 4.0 (attribution required)

Neither license includes warranties or liability coverage for security issues. Users are responsible for their own security audits and implementations.

---

**Last Updated**: January 1, 2026

For non security issues, please use the [GitHub Issues](https://github.com/Kushalitha/next-resume-pro/issues) page.
