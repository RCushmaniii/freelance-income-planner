---
title: Future Features & Roadmap
description: Planned enhancements and roadmap for CushLabs Income Planner.
category: Roadmap
order: 20
---

# Future Features & Roadmap

**Last Updated:** December 18, 2025  
**Status:** Active Development

---

## Next: Sharing & Portfolio Polish

### Shareable URLs (Deep Linking)

- Encode state in query parameters
- Optional “Copy Link” button

### Copy Summary

- One-click copy of Snapshot + Forecast summary (Notion/Slack-friendly)

---

## Phase 5: Analytics & Monitoring

### Analytics Integration

- Anonymous event tracking
- Privacy-friendly implementation (Plausible/PostHog)
- Page views and feature usage metrics

### Error Monitoring

- Runtime error tracking (Sentry)
- Performance monitoring
- Alert notifications

---

## Export & Sharing Features

### PDF Report Generation

- Professional PDF layout with CushLabs branding
- All scenarios and charts included
- Client-side generation (jsPDF)

### CSV Data Export

- Export all scenarios for spreadsheet analysis
- Monthly projections data
- Formatted for Excel/Google Sheets

### Social preview cards (optional)

- Add richer Open Graph/Twitter metadata (site + /income-planner)
- Optional generated OG image

---

## Advanced Calculations

### Multi-Currency Conversion

- Live FX rates via `/api/fx` (already implemented for MXN/USD)
- Add auto-refresh + “last updated” UI
- Expand beyond MXN/USD (requires conversion table or base normalization)

### Tax Bracket Calculations

- Progressive tax brackets (Smart Tax mode is the current approximation)
- Country-specific tax rules
- Deduction calculations

### Retirement Savings Projections

- Compound interest calculations
- Retirement age targets
- Investment return modeling

---

## AI Enhancements

### Personalized Recommendations

- Rate optimization suggestions
- Work-life balance recommendations
- Income goal feasibility analysis

### Industry Benchmarking

- Industry-specific rate data
- Geographic comparisons
- Experience level adjustments

### Predictive Insights

- Seasonal pattern detection
- Growth trajectory predictions
- Market trend analysis

---

## Platform Expansion

### Niche Calculators

1. Teacher Income Planner
2. Developer Rate Calculator
3. Consultant Revenue Projector
4. Creative Freelancer Tool

### Embed Widget

- Iframe embed code
- Customizable branding
- API for data exchange

### Mobile App

- React Native implementation
- Offline functionality
- iOS and Android support

---

## Implementation Priority

### High Priority (Next 3 Months)

1. 🔗 Shareable URLs (Deep Linking)
2. 📋 Copy Summary
3. 🔄 Analytics & Monitoring
4. 📋 PDF Export

### Medium Priority (3-6 Months)

1. Multi-currency conversion
2. CSV Export
3. Tax bracket calculations
4. Industry benchmarking

### Low Priority (6-12 Months)

1. AI-powered insights
2. Niche calculators
3. Embed widget
4. Mobile app

---

## Changelog

| Date         | Feature                                    | Status      |
| ------------ | ------------------------------------------ | ----------- |
| Dec 18, 2025 | Goal progress + FX proxy + runway insights | ✅ Complete |
| Dec 11, 2025 | Localization                               | ✅ Complete |
| Dec 10, 2025 | Phase 3C: Charts                           | ✅ Complete |
| Dec 10, 2025 | Phase 3B: Forecasting                      | ✅ Complete |
| Dec 9, 2025  | Phase 3: Calculator                        | ✅ Complete |
| Dec 8, 2025  | Phase 2: UI/UX                             | ✅ Complete |
| Dec 7, 2025  | Phase 1: Setup                             | ✅ Complete |

---

**For detailed specifications, see [PRD.md](./PRD.md)**
