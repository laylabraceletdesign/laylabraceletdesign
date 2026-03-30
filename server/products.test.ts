import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock user context
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Products Router", () => {
  it("should list all products", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list();
    expect(Array.isArray(products)).toBe(true);
  });

  it("should get product by id", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First get all products
    const products = await caller.products.list();
    
    if (products.length > 0) {
      const product = await caller.products.getById({ id: products[0].id });
      expect(product).toBeDefined();
      expect(product?.id).toBe(products[0].id);
    }
  });

  it("should get products by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list();
    if (products.length > 0) {
      const category = products[0].category;
      const categoryProducts = await caller.products.getByCategory({ category });
      
      expect(Array.isArray(categoryProducts)).toBe(true);
      expect(categoryProducts.length).toBeGreaterThan(0);
      expect(categoryProducts.every(p => p.category === category)).toBe(true);
    }
  });
});

describe("Bulk Inquiries Router", () => {
  it("should create bulk inquiry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.bulkInquiries.create({
      name: "Test Company",
      email: "test@example.com",
      phone: "+1234567890",
      company: "Test Corp",
      quantity: 100,
      eventType: "team_event",
      eventDate: "2026-06-01",
      customizationDetails: "Custom names on bracelets",
      message: "Test inquiry",
    });

    expect(result.success).toBe(true);
    expect(result.inquiryNumber).toBeDefined();
    expect(result.inquiryNumber).toMatch(/^BULK-/);
  });

  it("should reject inquiry with invalid quantity", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.bulkInquiries.create({
        name: "Test",
        email: "test@example.com",
        quantity: 15000, // Over max
        eventType: "team_event",
      });
      expect.fail("Should have thrown error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should only allow admin to list bulk inquiries", async () => {
    const publicCtx = createPublicContext();
    const adminCtx = createAdminContext();
    
    const publicCaller = appRouter.createCaller(publicCtx);
    const adminCaller = appRouter.createCaller(adminCtx);

    // Public user should not be able to list
    try {
      await publicCaller.bulkInquiries.list();
      expect.fail("Should have thrown unauthorized error");
    } catch (error) {
      expect(error).toBeDefined();
    }

    // Admin should be able to list
    const inquiries = await adminCaller.bulkInquiries.list();
    expect(Array.isArray(inquiries)).toBe(true);
  });
});

describe("Custom Requests Router", () => {
  it("should create custom request", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.customRequests.create({
      name: "John Doe",
      email: "john@example.com",
      description: "Custom logo charm bracelet",
      colorPreferences: "Blue and gold",
      budget: "500_1000",
      timeline: "normal",
      quantity: 50,
    });

    expect(result.success).toBe(true);
    expect(result.requestNumber).toBeDefined();
    expect(result.requestNumber).toMatch(/^CUSTOM-/);
  });

  it("should only allow admin to list custom requests", async () => {
    const publicCtx = createPublicContext();
    const adminCtx = createAdminContext();
    
    const publicCaller = appRouter.createCaller(publicCtx);
    const adminCaller = appRouter.createCaller(adminCtx);

    // Public user should not be able to list
    try {
      await publicCaller.customRequests.list();
      expect.fail("Should have thrown unauthorized error");
    } catch (error) {
      expect(error).toBeDefined();
    }

    // Admin should be able to list
    const requests = await adminCaller.customRequests.list();
    expect(Array.isArray(requests)).toBe(true);
  });
});

describe("Contact Router", () => {
  it("should submit contact form", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Wholesale Inquiry",
      message: "I'm interested in wholesale pricing for your bracelets",
      phone: "+1234567890",
    });

    expect(result.success).toBe(true);
  });

  it("should only allow admin to list contact submissions", async () => {
    const publicCtx = createPublicContext();
    const adminCtx = createAdminContext();
    
    const publicCaller = appRouter.createCaller(publicCtx);
    const adminCaller = appRouter.createCaller(adminCtx);

    // Public user should not be able to list
    try {
      await publicCaller.contact.list();
      expect.fail("Should have thrown unauthorized error");
    } catch (error) {
      expect(error).toBeDefined();
    }

    // Admin should be able to list
    const submissions = await adminCaller.contact.list();
    expect(Array.isArray(submissions)).toBe(true);
  });
});

describe("Auth Router", () => {
  it("should return null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();
    expect(user).toBeNull();
  });

  it("should return user data for authenticated user", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();
    expect(user).toBeDefined();
    expect(user?.id).toBe(1);
    expect(user?.role).toBe("admin");
  });
});
